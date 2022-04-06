import { IAnswer } from './../../answer/dtos/answer.dto';
import { ICategory } from './../../category/dtos/category.dto';
import { IDifficulty } from './../../difficulty/dtos/difficulty.dto';
import { Expose,Type } from 'class-transformer';
export class IQuestion { 
  @Expose()
  id:string;
  @Expose()
  name:string;

  @Expose()
  @Type(() => IDifficulty)
  difficulty: IDifficulty

  @Expose()
  @Type(() => ICategory)
  category: ICategory[]
  @Expose()
  @Type(() => IAnswer)
  answers: IAnswer[]
}