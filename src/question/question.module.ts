import { AnswerModule } from './../answer/answer.module';
import { DifficultyModule } from './../difficulty/difficulty.module';
import { QuestionService } from './question.service';
import { Question } from 'src/question/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [QuestionController],
  imports: [TypeOrmModule.forFeature([Question]),CategoryModule,DifficultyModule,AnswerModule],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
