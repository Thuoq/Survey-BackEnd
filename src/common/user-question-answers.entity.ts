import { ManyToOne } from 'typeorm';
import { Answer } from 'src/answer/answer.entity';
import { JoinColumn, OneToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AssignmentDetail } from './assignment-detail.entity';

@Entity()
export class UserQuestionAnswer { 
  @PrimaryGeneratedColumn("uuid") id:string;
  @OneToOne(type=> Answer, {
    eager:true
  })
  @JoinColumn()
  choiceAnswer: Answer;
  @Column({
    type:"boolean"
  }) isRight: boolean;
  @ManyToOne(() => AssignmentDetail,(assignmentDetail:AssignmentDetail) => assignmentDetail.userQuestionAnswers)
  assignmentDetail:AssignmentDetail

}