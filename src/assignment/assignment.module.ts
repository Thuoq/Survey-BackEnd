
import { AnswerModule } from './../answer/answer.module';
import { QuestionModule } from './../question/question.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from 'src/survey/survey.module';
import { AssignmentController } from './assignment.controller';
import { Assignment } from './assignment.entity';
import { AssignmentService } from './assignment.service';

@Module({
  controllers: [AssignmentController],
  imports:[ TypeOrmModule.forFeature([Assignment]),SurveyModule,QuestionModule,AnswerModule],
  providers:[ AssignmentService]
})
export class AssignmentModule {}
