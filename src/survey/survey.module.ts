import { QuestionModule } from './../question/question.module';
import { DifficultyModule } from './../difficulty/difficulty.module';
import { CategoryModule } from './../category/category.module';
import { Survey } from './survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports: [TypeOrmModule.forFeature([Survey]),CategoryModule,DifficultyModule,QuestionModule,
  CacheModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService) => ({
      store:redisStore,
      host:configService.get("REDIS_HOST"),
      port:configService.get("REDIS_PORT"),
      ttl:120
    })
  })],
  exports:[SurveyService]
})
export class SurveyModule {}
