import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { IUserDto } from './dtos/user.dto';
import { ICreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get,  Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';

@Controller('user')
@ApiCookieAuth()
@ApiTags('User')
@Serialize(IUserDto)
export class UserController {
  constructor(private userService: UserService ) {}

  @Get()
  async getAllUser():Promise<IUserDto[]> {
    return await this.userService.getAllUser()
  }
  @Post() 
  async createUser(@Body() body:ICreateUserDto):Promise<IUserDto> { 
    return await this.userService.create(body)
  }
  @Get('/:username')
  async getUserByUserName(@Param('username') username:string ):Promise<IUserDto>{
    return await this.userService.findOneUserName(username)
  }
  @Patch("/:id")
  async updateUser(@Param('id') id:string,@Body() body : UpdateUserDto):Promise<IUserDto> { 
    return await this.userService.update(id,body)
  }

  
  
}
