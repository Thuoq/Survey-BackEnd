import { Serialize } from 'src/interceptor/serialize.interceptor';
import  JwtAuthGuard  from 'src/auth/jwt-auth.guard';
import { ISurvey } from './dtos/survey.dto';
import { ICreateSurvey } from './dtos/create-survey.dto';
import { SurveyService } from './survey.service';
import { Body, CacheInterceptor, CacheKey, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import {ApiTags ,ApiCookieAuth} from '@nestjs/swagger'
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';
import { GET_SURVEY_CACHE_KEY } from './survey.constant';

@Controller('survey')
@Serialize(ISurvey)
@ApiCookieAuth()
@ApiTags('Survey')
export class SurveyController {
  constructor( private readonly surveyService:SurveyService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_SURVEY_CACHE_KEY)
  @Get()
  async getAllSurvey():Promise<ISurvey[]> {
    return await this.surveyService.getAllSurvey()
  }
 
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Post()
  async postSurvey(@Body() payload:ICreateSurvey):Promise<ISurvey> {
    return await this.surveyService.createSurvey(payload);
  }
 
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  patchSurvey(@Param("id",new ParseUUIDPipe({version:'4'})) id:string ) {}
  
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async deleteSurvey(@Param("id",new ParseUUIDPipe({version:'4'})) id:string ):Promise<void> {
    return await this.surveyService.deleteSurveyById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getASurvey(@Param("id",new ParseUUIDPipe({version:'4'})) id:string ):Promise<ISurvey> {
    return await this.surveyService.getOneSurveyById(id);
  }
}
