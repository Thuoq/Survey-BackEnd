import { ICreateAssignment } from './dtos/create-assignment.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { AssignmentService } from './assignment.service';

@Controller('assignment')
@UseGuards(JwtAuthGuard)
export class AssignmentController {
  constructor(private readonly assignmentService:AssignmentService){}
  @Get()
  getAllAssignmentByUser (@Req() request: RequestWithUser) {
    return request.user.assignments
  }
  @Patch("/:id")
  async patchAssignmentByUser(@Param("id") id:string) { 

  }
  @Post()
  async createAssignmentByUser(@Req() request: RequestWithUser, @Body() payload:ICreateAssignment) {
    const user = request.user;
    return await this.assignmentService.createAssignmentByUser(user,payload);

  }
  @Get("/:id")
  async getOneAssignmentByUser() {

  }
  @Delete("/:id")
  async deleteOneAssignmentById() { 
    
  }
}
