import { ApiTags } from '@nestjs/swagger';
import { ICreateSubmitAssignment } from './dtos/post-submit-assignment.dto';
import { ICreateAssignment } from './dtos/create-assignment.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { AssignmentService } from './assignment.service';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ISubmitAssignment } from './dtos/submit-assignment.dto';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';

@Controller('assignment')
@Serialize(ISubmitAssignment)
@ApiTags("Assignment")
export class AssignmentController {
  constructor(private readonly assignmentService:AssignmentService){}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAssignmentByUser (@Req() request: RequestWithUser):Promise<ISubmitAssignment[]> {
    return await this.assignmentService.getAllAssignmentByUser(request.user)
  }
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  async patchAssignmentByUser(@Param("id",new ParseUUIDPipe({version:'4'})) id:string) { 

  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createAssignmentByUser(@Req() request: RequestWithUser, @Body() payload:ICreateAssignment):Promise<ISubmitAssignment> {
   
      const user = request.user;
      return await this.assignmentService.createAssignmentByUser(user,payload);
    

  }
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getOneAssignmentByUser(@Req() request: RequestWithUser,@Param("id",new ParseUUIDPipe({version:'4'})) id:string):Promise<ISubmitAssignment> {
   
      return await this.assignmentService.getOneAssignment(request.user,id);
    
  }
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async deleteOneAssignmentById(@Param("id",new ParseUUIDPipe({version:'4'})) id:string):Promise<void> { 
    return await this.assignmentService.deleteOneAssignment(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(":id/submit")
  async userSubmitAssignment(@Req() request: RequestWithUser,@Param("id",new ParseUUIDPipe({version:'4'})) id:string, @Body() payload:ICreateSubmitAssignment):Promise<ISubmitAssignment> {
    return await this.assignmentService.userSubmitAssignment(id,request.user,payload)
  }
}
