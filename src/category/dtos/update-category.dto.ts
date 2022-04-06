import { IsString } from "class-validator";

export class IUpdateCategory { 
  @IsString()
  name:string;
}