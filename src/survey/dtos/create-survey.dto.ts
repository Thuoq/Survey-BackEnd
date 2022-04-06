import { IQuestion } from './../../question/dtos/question.dto';
import { IsString,IsArray } from "class-validator";

export class ICreateSurvey {
  @IsString()
  name: string;
  @IsString()
  difficulty: string;
  @IsString()
  category:string;
  @IsArray() 
  questions: IQuestion[];
}