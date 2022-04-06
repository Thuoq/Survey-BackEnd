import { ICreateAnswer } from './../../answer/dtos/create-answer.dto';


import { IsArray, IsString } from "class-validator";


export class ICreateQuestion { 
  @IsString()
  name:string;
  @IsString()
  difficulty:string;
  @IsArray()
  category:string[];
  
  @IsArray()
  answers: ICreateAnswer[];
}
