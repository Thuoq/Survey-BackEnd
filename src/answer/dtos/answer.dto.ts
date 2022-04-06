import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class IAnswer{ 
  @Expose()
  id:string;
  @ApiProperty({
    example:"Anh yêu em rất nhiều",
    description:"Nội dung của câu trả lời"
  })
  @Expose()
  name:string; 
  @ApiProperty({
    example:true,
    description:"Có phải là đáp án hay không"
  })
  @Expose()
  isAnswer:boolean;
}