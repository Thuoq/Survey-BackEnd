import { IsUUID } from 'class-validator';
import { ICreateQuestion } from './../../question/dtos/create-question.dto';
import { IsArray, UUIDVersion } from 'class-validator';
import { IsOptional, IsString} from 'class-validator';

export class IUpdateSurvey { 
  @IsString()
  @IsOptional()
  name: string
  @IsUUID('4', {each:true})
  @IsOptional()
  questionsOldId:string[]
  @IsArray()
  @IsOptional()
  questionsNew: ICreateQuestion[]
}