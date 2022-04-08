import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';
import { DifficultyModule } from './difficulty/difficulty.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import * as Joi from '@hapi/joi';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports:  [ AssignmentModule, AuthModule, SurveyModule, DifficultyModule, UserModule, CategoryModule,
  ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(), 
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().required(),
    })
  }),
  DatabaseModule,
  QuestionModule,
  AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
