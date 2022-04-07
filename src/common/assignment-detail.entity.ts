import { UserQuestionAnswer } from "./user-question-answers.entity";
import { Assignment } from "src/assignment/assignment.entity";
import { Question } from "src/question/question.entity";
import { Entity, JoinColumn, PrimaryGeneratedColumn,ManyToOne, Column,OneToOne, OneToMany } from "typeorm";

@Entity()
export class AssignmentDetail { 
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() pointQuestion: number;
  @ManyToOne(() => Assignment,(assignment:Assignment) => assignment.assignmentDetails )
  @JoinColumn()
  assignment: Assignment
  @OneToOne((type) => Question)
  @JoinColumn()
  question: Question
  @OneToMany(()=> UserQuestionAnswer,(userQuestionAnswer:UserQuestionAnswer) =>userQuestionAnswer.assignmentDetail)
  userQuestionAnswers: UserQuestionAnswer[]
  

}