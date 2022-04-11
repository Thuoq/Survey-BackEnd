import { IsArray, IsUUID } from 'class-validator';
export class ICreateUserQuestionAnswer { 
  @IsUUID()
  choice_id:string;
}
export class ICreateAssignmentDetail { 
  @IsUUID()
  questionId:string;
  @IsArray()
  userQuestionAnswers: ICreateUserQuestionAnswer[]
}
export class ICreateSubmitAssignment{ 
  @IsArray()
  data: ICreateAssignmentDetail[]
}
