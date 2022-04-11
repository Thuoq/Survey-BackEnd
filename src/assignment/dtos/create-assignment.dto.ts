import { IsUUID } from "class-validator";

export class ICreateAssignment { 
  @IsUUID()
  surveyId: string;
}