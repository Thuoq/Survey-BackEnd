import { IsString } from "class-validator";

export class ICreateAssignment { 

  @IsString()
  surveyId: string;
}