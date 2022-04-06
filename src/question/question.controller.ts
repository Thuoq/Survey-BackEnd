import { Serialize } from 'src/interceptor/serialize.interceptor';
import { IQuestion } from './dtos/question.dto';
import { IUpdateQuestion } from './dtos/update-question.dto';
import { ICreateQuestion } from './dtos/create-question.dto';
import { QuestionService } from './question.service';
import { ApiTags ,ApiCookieAuth} from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';



@Controller('question')
@Serialize(IQuestion)
@UseGuards(RoleGuard(UserRole.ADMIN))
@UseGuards(JwtAuthGuard)
@ApiCookieAuth()
@ApiTags("Question")
export class QuestionController {
  constructor(private readonly questionService:QuestionService) {}
  @Get() 
  async getAllQuestion():Promise<IQuestion[]> {
    return await this.questionService.getAllQuestion()
  }
  @Get("/:id") 
  async getAQuestion(@Param("id") id:string):Promise<IQuestion> {
    return await this.questionService.findAQuestion(id)
  }
  @Post()
  async createQuestion(@Body() payload: ICreateQuestion):Promise<IQuestion> {

    return await this.questionService.createQuestion(payload)
  }
  @Patch("/:id")
  async updateQuestion(@Param("id") id:string,@Body() payload:IUpdateQuestion):Promise<IQuestion> {
    return await this.questionService.updateQuestion(id,payload);
  }
  @Delete("/:id")
  async deleteQuestion() {
    
  }
}
