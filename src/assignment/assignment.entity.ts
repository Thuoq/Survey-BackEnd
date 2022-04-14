import { OneToMany } from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { User } from './../user/user.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { AssignmentDetail } from '../common/assignment-detail.entity';


@Entity()
export class Assignment {
  @PrimaryGeneratedColumn("uuid") id:string;
  @Column({
    type:'float',
    default:-1
  }) pointSurvey:number
  @Column({
    type:'boolean',
    default:false
  }) isFinished: boolean;

  @ManyToOne(type => User, {
    eager:true,
    cascade:true
  })
  @JoinColumn()
  owner: User
  @ManyToOne(type => Survey, { 
    eager:true,
    cascade:true
  })
  @JoinColumn()
  survey: Survey

  @OneToMany(type => AssignmentDetail, (assignmentDetail:AssignmentDetail) => assignmentDetail.assignment , {
    cascade:true,
    eager:true
  })
  @JoinColumn() 
  assignmentDetails: AssignmentDetail[]
}