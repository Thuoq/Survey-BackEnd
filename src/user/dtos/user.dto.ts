import { Expose } from "class-transformer";
import { UserRole } from "../../common/userRole";
import {ApiProperty} from '@nestjs/swagger'
export class IUserDto { 
  // @Expose()
  // id:number
  @ApiProperty({
    example:"thuong",
    description:"Tên của của user"
  })
  @Expose()
  username: string 
  @Expose()
  @ApiProperty({
    example:"user",
    enum:['admin','user'],
    description:"Role của user"
  })
  role:UserRole
}