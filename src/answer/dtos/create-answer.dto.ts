import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICreateAnswer { 
  @IsString()
  @ApiProperty({
    description:"Tên của câu trả lời",
    
  })
  name:string;

  @IsBoolean()
  @ApiProperty()
  isAnswer:boolean;
}