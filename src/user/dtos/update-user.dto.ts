import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserDto  { 
  @IsString()
  @IsOptional()
  username:string 

  @IsString()
  @IsOptional()
  password: string 

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}