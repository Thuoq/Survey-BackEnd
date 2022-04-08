
import { Versioning } from 'src/common/version.entity';
import { ManyToOne } from 'typeorm';
import { Answer } from 'src/answer/answer.entity';
import {  OneToOne } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AssignmentDetail } from './assignment-detail.entity';

@Entity()
export class UserQuestionAnswer { 
  @PrimaryGeneratedColumn("uuid") id:string;
  @OneToOne(type=> Answer,(ans:Answer) => ans.userQuestionAnswer, { 
    eager:true,
    cascade:true
  })
  // @JoinColumn()
  choiceAnswer: Answer;

  @Column({
    type:"boolean"
  }) isRight: boolean;

  @ManyToOne((type) => AssignmentDetail,(assignmentDetail:AssignmentDetail) => assignmentDetail.userQuestionAnswers, {
    onDelete:"CASCADE"
  })
  assignmentDetail:AssignmentDetail

  @Column(type => Versioning) versioning: Versioning;
} 