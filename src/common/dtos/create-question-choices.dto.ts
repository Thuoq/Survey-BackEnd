import { IsBoolean, IsString } from "class-validator";

export class ICreateQuestionChoices { 
  @IsBoolean()
  isAnswer:boolean;
  @IsString()
  answerId:string;
}