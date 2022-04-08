import { AssignmentDetail } from 'src/common/assignment-detail.entity';
import { Question } from './../question/question.entity';
import { Category } from './../category/category.entity';
import { Difficulty } from '../difficulty/difficulty.entity';
import { Survey } from '../survey/survey.entity';
import { User } from '../user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Answer } from 'src/answer/answer.entity';
import { Assignment } from 'src/assignment/assignment.entity';
import { UserQuestionAnswer } from 'src/common/user-question-answers.entity';
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
            User,Survey,Difficulty,Category,Question,Answer, Assignment,AssignmentDetail,UserQuestionAnswer
          ],
          synchronize: true, 
        }
      }
    }),
  ],
})
export class DatabaseModule {}