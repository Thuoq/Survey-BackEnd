import { IsString } from "class-validator";


export class ICreateUserDto { 
  @IsString()
  username: string 
  @IsString()
  password: string 
}