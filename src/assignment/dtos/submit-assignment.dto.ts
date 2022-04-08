import { ISurvey } from 'src/survey/dtos/survey.dto';
import { IUserDto } from './../../user/dtos/user.dto';
import { Expose, Type } from "class-transformer";
import { IAssignmentDetail } from 'src/common/dtos/assignment-detail.dto';

export class ISubmitAssignment { 
  @Expose()
  id:string;
  @Expose()
  pointSurvey:number;
  @Expose()
  @Type(() => IUserDto)
  owner: IUserDto;
  @Expose()
  @Type(() => IAssignmentDetail)
  assignmentDetails:IAssignmentDetail[]
  @Expose()
  @Type(() => ISurvey)
  survey:ISurvey
  @Expose()
  isFinished:boolean;
}