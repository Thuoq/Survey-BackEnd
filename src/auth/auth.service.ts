import { ConfigService } from '@nestjs/config';
import { PostgresErrorCode } from '../database/error.constraints';
import { ICreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { Injectable, HttpException, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import {Cache } from 'cache-manager'
import * as bcrypt from 'bcrypt';
// Authentication vs Authorization 
// Authentication nghĩa là check the identity user. Nó sẽ trả lời câu hỏi ai là user ? 
// Authorization nghĩa là cho phép đc access src. Nó sẽ trả lời câu hỏi user có thể authorization cái operator này k 
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager:Cache
  ) {}
  public getCookieWithJwtAccessToken(userId:string) { 
    const payload: TokenPayload = {userId};
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
  }
  public async  getCookieWithJwtRefreshToken(userId:string) { 
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
   
    return {
      cookie,
      token
    }
  }
  async setTokenRefreshIntoRedis(userId:string,token:string) {
    const hashToken = await bcrypt.hash(token, 10);
    await this.cacheManager.set(userId,hashToken);
  }
  async getTokenRefreshRedis(userId:string) { 
    return await this.cacheManager.get(userId);
  }
  public async register(userCreate:ICreateUserDto) { 
    try { 
      await this.userService.create(userCreate)
      return "Bạn đã đăng ký thành công vui lòng trở về đăng nhập";
    } catch(error) { 
      if(error?.code === PostgresErrorCode.UniqueViolation ) { 
        throw new HttpException('User with username has exists',HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getAuthenticatedUser(username:string,passwordText: string) { 
    try { 
      const user = await this.userService.findOneUserName(username)
      await this.verifyPassword(passwordText,user.password)
      return user;
    }catch(error) { 
      throw new HttpException('Wrong credentials provided',HttpStatus.BAD_REQUEST)
    }
    
  }
  async verifyPassword(passwordText:string, hashPassword:string) { 
    const isPasswordMatching = await compare(passwordText,hashPassword)
    if(!isPasswordMatching) { 
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
  async getUserIfRefreshTokenMatches(refreshToken:string, userId:string) {
    const tokenHashed:string = await this.cacheManager.get(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      tokenHashed
    );
    if(isRefreshTokenMatching) { 
      const user =await this.userService.findOneById(userId)
      return user;
    }
  }
  async removeRefreshTokenRedis(userId: string) {
    await this.cacheManager.del(userId)
  }
  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly;Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
  
}
