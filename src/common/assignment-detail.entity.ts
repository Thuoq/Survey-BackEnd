import { Versioning } from 'src/common/version.entity';
import { UserQuestionAnswer } from "./user-question-answers.entity";
import { Assignment } from "src/assignment/assignment.entity";
import { Question } from "src/question/question.entity";
import { Entity, JoinColumn, PrimaryGeneratedColumn,ManyToOne, Column,OneToOne, OneToMany } from "typeorm";

@Entity()
export class AssignmentDetail { 
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({type:'float'}) pointQuestion: number;

  @ManyToOne((type) => Assignment,(assignment:Assignment) => assignment.assignmentDetails,{ onDelete:"CASCADE" })
  assignment: Assignment;

  @OneToOne((type) => Question)
  question: Question; 
  
  @OneToMany(()=> UserQuestionAnswer,(userQuestionAnswer:UserQuestionAnswer) =>userQuestionAnswer.assignmentDetail , { 
    cascade:true,
    eager:true,
    onDelete:"CASCADE"
  }) 
  userQuestionAnswers: UserQuestionAnswer[]
  
  @Column(type => Versioning) versioning: Versioning;
 
}