import { ConfigService } from '@nestjs/config';
import { PostgresErrorCode } from '../database/error.constraints';
import { ICreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

// Authentication vs Authorization 
// Authentication nghĩa là check the identity user. Nó sẽ trả lời câu hỏi ai là user ? 
// Authorization nghĩa là cho phép đc access src. Nó sẽ trả lời câu hỏi user có thể authorization cái operator này k 
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  public getCookieWithJwtAccessToken(userId:string) { 
    const payload: TokenPayload = {userId};
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; SameSite=None; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
  }
  public getCookieWithJwtRefreshToken(userId:string) { 
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; SameSite=None; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
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
  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
  
}
