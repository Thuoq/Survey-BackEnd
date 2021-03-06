import { UserQuestionAnswer } from 'src/common/user-question-answers.entity';
import { Question } from 'src/question/question.entity';
import { Versioning } from "src/common/version.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn,OneToMany } from "typeorm";

@Entity()
export class Answer { 
  @PrimaryGeneratedColumn("uuid") id:string;
  @Column() name:string; 
  @Column(type => Versioning) versioning: Versioning;
  @Column() isAnswer:boolean;
  @ManyToOne(() => Question ,(q:Question) => q.answers, { 
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
  })
  @JoinColumn()
  question:Question;
  @OneToMany((type) => UserQuestionAnswer,(userQuestionAnswer:UserQuestionAnswer) => userQuestionAnswer.choiceAnswer)
  userQuestionAnswer: UserQuestionAnswer[]
}