import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,JwtRefreshTokenStrategy],
  imports:[UserModule,ConfigModule,PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService:ConfigService) => ({ 
      secret: configService.get('JWT_SECRET'),
      signOptions: { 
        expiresIn:  `${configService.get('JWT_EXPIRATION_TIME')}s`
      }
    })
  }), CacheModule.registerAsync({ 
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:(configService:ConfigService)=> ({ 
      store: redisStore,
      host:configService.get("REDIS_HOST"),
      port:configService.get("REDIS_PORT"),
      ttl:configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    })
  })],
  // exports:[AuthService]
})
export class AuthModule {}
