import { RefreshToken } from './../common/refreshToken.entity';
import { ICreateUserDto } from './dtos/create-user.dto';

import { User } from './user.entity';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repoUser: Repository<User>,
    @InjectRepository(RefreshToken) private repoRefreshToken: Repository<RefreshToken>
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
  async update(id:string , attrs) {
    
    const user = await this.findOneById(id)
    Object.assign(user,attrs)
   
    return this.repoUser.save(user)
  }
  // async createRefreshToken(token:string, user:User) { 
  //   const refreshToken =  this.repoRefreshToken.create({refreshToken:token,user:user.id.toString()})
  //   return await this.repoRefreshToken.save(refreshToken)
  // }
  async setCurrentRefreshToken(refreshTokenStr: string, userId: string) {
    try {
      const hashToken = await bcrypt.hash(refreshTokenStr, 10);
      await this.update(userId,{refreshToken:{refreshToken:hashToken}})
    } catch(err) { 
      console.error(err)
    }
   
  }
  async getUserIfRefreshTokenMatches(refreshToken:string, userId:string) {
    const user = await this.findOneById(userId) 
    
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken.refreshToken
    );
    console.log(isRefreshTokenMatching)
    if(isRefreshTokenMatching) { 
      return user;
    }
  }
  async removeRefreshToken(userId: string) {
    const user = await this.findOneById(userId)
    const refreshTokenId = user.refreshToken.id;
    Object.assign(user,{refreshToken:null})
    await this.repoUser.save(user)
    await this.repoRefreshToken.delete({id:refreshTokenId});

    // return this.repoUser.update(userId, {
    //   refreshToken: null
    // });
  }
}
