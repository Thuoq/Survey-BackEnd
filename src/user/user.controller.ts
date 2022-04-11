import JwtAuthGuard  from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { IUserDto } from './dtos/user.dto';
import { ICreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post, UseGuards, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';

@Controller('user')
@UseGuards(RoleGuard(UserRole.ADMIN))
@UseGuards(JwtAuthGuard)
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
  async updateUser(@Param('id',new ParseUUIDPipe({version:'4'})) id:string,@Body() body : UpdateUserDto):Promise<IUserDto> { 
    return await this.userService.update(id,body)
  }
  @Delete("/:id")
  async deleteUser(@Param("id",new ParseUUIDPipe({version:'4'})) id:string) { 
    return await this.userService.deleteUser(id);
  }

  
  
}
