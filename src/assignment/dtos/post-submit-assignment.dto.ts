import { IsArray, IsString } from 'class-validator';
export class ICreateUserQuestionAnswer { 
  @IsString()
  choice_id:string;
}
export class ICreateAssignmentDetail { 
  @IsString()
  questionId:string;
  @IsArray()
  userQuestionAnswers: ICreateUserQuestionAnswer[]
}
export class ICreateSubmitAssignment{ 
  @IsArray()
  data: ICreateAssignmentDetail[]
}
