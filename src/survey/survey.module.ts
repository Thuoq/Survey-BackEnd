import { QuestionModule } from './../question/question.module';
import { QuestionService } from './../question/question.service';
import { DifficultyModule } from './../difficulty/difficulty.module';
import { CategoryModule } from './../category/category.module';
import { Survey } from './survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports: [TypeOrmModule.forFeature([Survey]),CategoryModule,DifficultyModule,QuestionModule],
  exports:[SurveyService]
})
export class SurveyModule {}
