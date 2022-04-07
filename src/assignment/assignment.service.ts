import { ICreateAssignment } from './dtos/create-assignment.dto';
import { IUserDto } from './../user/dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { SurveyService } from 'src/survey/survey.service';

@Injectable()
export class AssignmentService {
  constructor(@InjectRepository(Assignment) private readonly repoAssignment: Repository<Assignment>,
  private readonly surveyService:SurveyService) {}

  async getAllAssignmentByUser(userId:string) {

  }
  async createAssignmentByUser(user:IUserDto,payload:ICreateAssignment) {
    const survey = await this.surveyService.findOneSurvey(payload.surveyId)
    const assignment = this.repoAssignment.create({
      survey,
      owner:user,
    })
    await this.repoAssignment.save(assignment);
    return assignment;
  }
}
