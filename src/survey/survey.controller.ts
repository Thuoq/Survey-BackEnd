import { IUpdateSurvey } from './dtos/update-survey.dto';
import { HttpCacheInterceptor } from './../interceptor/httpCache.interceptor';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import  JwtAuthGuard  from 'src/auth/jwt-auth.guard';
import { ISurvey } from './dtos/survey.dto';
import { ICreateSurvey } from './dtos/create-survey.dto';
import { SurveyService } from './survey.service';
import { Body, CacheInterceptor, CacheKey, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, ParseUUIDPipe, Query } from '@nestjs/common';
import {ApiTags ,ApiCookieAuth, ApiQuery} from '@nestjs/swagger'
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';
import { GET_SURVEY_CACHE_KEY } from './survey.constant';

@Controller('survey')
@Serialize(ISurvey)
@ApiCookieAuth()
@ApiTags('Survey')
export class SurveyController {
  constructor( private readonly surveyService:SurveyService) {}
  @ApiQuery({
    name: "category",
    type: String,
    required: false
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_SURVEY_CACHE_KEY)
  @Get()
  async getAllSurvey(@Query('category') category?:string):Promise<ISurvey[]> {
    
    return await this.surveyService.getAllSurvey(category)
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
  patchSurvey(@Param("id",new ParseUUIDPipe({version:'4'})) id:string, @Body() payload: IUpdateSurvey ) {
    this.surveyService.patchSurveyById(id,payload);
  }
  
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
