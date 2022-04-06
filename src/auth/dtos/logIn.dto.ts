import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDto;