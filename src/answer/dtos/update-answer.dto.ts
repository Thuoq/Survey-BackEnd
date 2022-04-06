import { IsString,IsOptional,IsBoolean } from "class-validator";

export class IUpdateAnswer { 
  @IsString()
  @IsOptional()
  name:string;

  @IsBoolean()
  @IsOptional()
  isAnswer:boolean;

}