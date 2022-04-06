import { Question } from './../question/question.entity';
import { Category } from './../category/category.entity';
import { Difficulty } from '../difficulty/difficulty.entity';
import { Survey } from '../survey/survey.entity';
import { RefreshToken } from '../common/refreshToken.entity';
import { User } from '../user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Answer } from 'src/answer/answer.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [
            User,RefreshToken,Survey,Difficulty,Category,Question,Answer
          ],
          synchronize: true, 
        }
      }
    }),
  ],
})
export class DatabaseModule {}