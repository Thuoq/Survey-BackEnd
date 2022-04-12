// import { RefreshToken } from './../common/refreshToken.entity';
import { ICreateUserDto } from './dtos/create-user.dto';

import { User } from './user.entity';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repoUser: Repository<User>,
  ) {
     
  }
  async create(attrs:ICreateUserDto ) {
    
    const user = this.repoUser.create({username:attrs.username,password:attrs.password})
    await this.repoUser.save(user)
    return user;
  }
  async findOneById(id:string) {
    const user = await this.repoUser.findOne({where: {id}})
    if(!user) {
      throw new NotFoundException(`Not found user by id ${id}`)
    }
    return user;
  }
  async findOneUserName(username:string) {
    const user = await this.repoUser.findOne({where: {username}});
    if(!user ) { 
      throw new HttpException("User with this username does not exist",HttpStatus.NOT_FOUND)
    }
    return user;
  }
  async getAllUser() {
    return await  this.repoUser.find()
  }
  async update(id:string , attrs:Partial<UpdateUserDto>) {
    
    const user = await this.findOneById(id)
    Object.assign(user,attrs)
   
    return this.repoUser.save(user)
  }
  async deleteUser(userId:string) { 
    const user=  await this.findOneById(userId);
    await this.repoUser.remove(user);
    return;
  }
}
