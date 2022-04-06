import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
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
  })],
  // exports:[AuthService]
})
export class AuthModule {}
