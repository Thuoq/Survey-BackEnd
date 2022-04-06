import { IsString } from "class-validator";


export class ICreateDifficulty {
  @IsString() 
  name: string;
}