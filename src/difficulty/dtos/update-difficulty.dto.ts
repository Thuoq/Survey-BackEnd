import { IsString } from 'class-validator';
export class IUpdateDifficulty { 
  @IsString()
  name: string;
}