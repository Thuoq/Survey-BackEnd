import { IsString } from "class-validator";

export class ICreateCategory { 
  @IsString()
  name: string;
}