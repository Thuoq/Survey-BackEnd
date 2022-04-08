import { IQuestion } from '../../question/dtos/question.dto';
import { Expose, Type } from 'class-transformer';
import { IUserQuestionAnswer } from './user-question-answer.dto';

export class IAssignmentDetail { 
  @Expose()
  id: string;
  @Expose()
  @Type(() => IQuestion)
  question:IQuestion
  @Expose()
  pointQuestion: number;
  @Expose()
  @Type(() => IUserQuestionAnswer)
  userQuestionAnswers:IUserQuestionAnswer[]
}