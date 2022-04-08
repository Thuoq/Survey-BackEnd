import { LogInDto } from './dtos/logIn.dto';
import { UserService } from '../user/user.service';
import { IUserDto } from '../user/dtos/user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { LocalAuthenticationGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { ICreateUserDto } from '../user/dtos/create-user.dto';
import { Controller, HttpCode, Post, UseGuards, Body, Req, Res, Get } from '@nestjs/common';
import RequestWithUser from './requestWithUser.interface';
import { ApiTags,ApiBody } from '@nestjs/swagger'
import JwtAuthGuard from './jwt-auth.guard';
import JwtRefreshGuard from './jwt-refresh.guard';

@Controller('auth')
@Serialize(IUserDto)
@ApiTags("authentication")
export class AuthController {
  constructor(private readonly AuthService: AuthService,private readonly userService: UserService ) {}
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser):IUserDto {
    const accessTokenCookie = this.AuthService.getCookieWithJwtAccessToken(request.user.id);
    
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser):IUserDto {
    const user = request.user;
    return user;
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("/login")
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser ):Promise<IUserDto> {
    const {user} = request;

    const accessTokenCookie = this.AuthService.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = await this.AuthService.getCookieWithJwtRefreshToken(user.id);
    await this.AuthService.setTokenRefreshIntoRedis(user.id,refreshTokenCookie.token);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    return user;
  }

  @Post("/register")
  register(@Body() userCreate: ICreateUserDto):Promise<string> {
  
    return this.AuthService.register(userCreate)
  }
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser):Promise<void> {
  
    await this.AuthService.removeRefreshTokenRedis(request.user.id);
    request.res.setHeader('Set-Cookie', this.AuthService.getCookiesForLogOut());
  }
}
