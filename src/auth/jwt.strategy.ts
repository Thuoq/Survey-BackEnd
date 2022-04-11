import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { ExtractJwt } from 'passport-jwt';


import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService) { 
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request:Request)=> {
          return request?.cookies?.Authentication
        }]),
        secretOrKey: configService.get('JWT_SECRET')
      })
    }
  async validate(payload: TokenPayload) {
    // console.log(payload)
    return this.userService.findOneById(payload.userId);
  }
}