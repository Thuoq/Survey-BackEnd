import { IDifficulty } from './../../difficulty/dtos/difficulty.dto';
import { ICategory } from './../../category/dtos/category.dto';
import { IQuestion } from './../../question/dtos/question.dto';
import { Expose,Type } from "class-transformer";

export class ISurvey { 
  @Expose()
  name:string;
  @Expose()
  @Type(() => IQuestion)
  questions:IQuestion[]
  @Expose()
  @Type(() => ICategory)
  category:ICategory;
  @Expose()
  @Type(() => IDifficulty)
  difficulty:IDifficulty;
}