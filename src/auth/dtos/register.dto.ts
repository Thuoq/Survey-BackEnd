import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {


  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}