import { ICreateAnswer } from './../../answer/dtos/create-answer.dto';
import { ICreateCategory } from './../../category/dtos/create-category.dto';
import { ICreateDifficulty } from './../../difficulty/dtos/create-difficulty.dto';
import { IsArray, IsOptional, IsString } from "class-validator";
import { Optional } from '@nestjs/common';

export class IUpdateQuestion { 
  @IsString()
  @IsOptional()
  name:string; 
  @IsArray()
  @IsOptional()
  categories: ICreateCategory[];
  @IsString()
  @IsOptional()
  difficulty: string;
  @IsArray()
  @IsOptional()
  answers: ICreateAnswer[]
}