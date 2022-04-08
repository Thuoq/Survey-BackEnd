import { IAnswer } from './../../answer/dtos/answer.dto';
import { Expose, Type } from "class-transformer";

export class IUserQuestionAnswer { 
  @Expose()
  id:string;
  @Expose()
  isRight:boolean;
  @Expose()
  @Type(() => IAnswer)
  choiceAnswer: IAnswer;
}