import { Versioning } from './version.entity';
import { UserQuestionAnswer } from "./user-question-answers.entity";
import { Assignment } from "../assignment/assignment.entity";
import { Question } from "../question/question.entity";
import { Entity, PrimaryGeneratedColumn,ManyToOne, Column, OneToMany } from "typeorm";

@Entity()
export class AssignmentDetail { 
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({type:'float'}) pointQuestion: number;

  @ManyToOne((type) => Assignment,(assignment:Assignment) => assignment.assignmentDetails,{ onDelete:"CASCADE" })
  assignment: Assignment;

  @ManyToOne((type) => Question, {
    eager:true
  })
  question: Question; 
  
  @OneToMany(()=> UserQuestionAnswer,(userQuestionAnswer:UserQuestionAnswer) =>userQuestionAnswer.assignmentDetail , { 
    cascade:true,
    eager:true,
    onDelete:"CASCADE"
  }) 
  userQuestionAnswers: UserQuestionAnswer[]
  
  @Column(type => Versioning) versioning: Versioning;
 
}