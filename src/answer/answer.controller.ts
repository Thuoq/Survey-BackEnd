import { Serialize } from 'src/interceptor/serialize.interceptor';
import { IUpdateAnswer } from './dtos/update-answer.dto';
import { IAnswer } from './dtos/answer.dto';
import { ICreateAnswer } from './dtos/create-answer.dto';
import { AnswerService } from './answer.service';
import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import {ApiTags,ApiCookieAuth}  from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';
@Controller('answer')
@Serialize(IAnswer)
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard(UserRole.ADMIN))
@ApiCookieAuth()
@ApiTags("Answer")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async getAllAnswer(): Promise<IAnswer[]>{
    return await this.answerService.getAllAnswer()
  }
  @Get("/:id")
  async getAnAnswer(@Param("id") id:string): Promise<IAnswer>{
    return await this.answerService.getOneAnswerById(id);
  }
  @Post()
  async createAnswer(@Body() payload:ICreateAnswer):Promise<IAnswer>{ 
    return await this.answerService.createAnswer(payload)
  }
  @Patch("/:id")
  async updateAnswer(@Param('id') id:string,@Body() attrs:IUpdateAnswer): Promise<IAnswer> {
    return await this.answerService.updateAnswer(id,attrs);
  }
  @Delete("/:id") 
  async deleteAnswer(@Param('id') id:string):Promise<void> {
    return await this.answerService.deleteAnswer(id)
  }
}
