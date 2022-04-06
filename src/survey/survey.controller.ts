import { Serialize } from 'src/interceptor/serialize.interceptor';
import  JwtAuthGuard  from 'src/auth/jwt-auth.guard';
import { ISurvey } from './dtos/survey.dto';
import { ICreateSurvey } from './dtos/create-survey.dto';
import { SurveyService } from './survey.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {ApiTags ,ApiCookieAuth} from '@nestjs/swagger'
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';

@Controller('survey')
@Serialize(ISurvey)
@UseGuards(JwtAuthGuard)
@ApiCookieAuth()
@ApiTags('Survey')
export class SurveyController {
  constructor( private readonly surveyService:SurveyService) {}

  @Get()
  async getAllSurvey():Promise<ISurvey[]> {
    return await this.surveyService.getAllSurvey()
  }
 
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @Post()
  async postSurvey(@Body() payload:ICreateSurvey):Promise<ISurvey> {
    return await this.surveyService.createSurvey(payload);
  }
 
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @Patch("/:id")
  patchSurvey(@Param("id") id:string ) {}
  
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @Delete("/:id")
  async deleteSurvey(@Param("id") id:string ):Promise<void> {
    return await this.surveyService.deleteSurveyById(id);
  }

  @Get("/:id")
  async getASurvey(@Param("id") id:string ):Promise<ISurvey> {
    return await this.surveyService.getOneSurveyById(id);
  }
}
