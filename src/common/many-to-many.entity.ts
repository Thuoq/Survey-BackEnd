import { Answer } from "src/answer/answer.entity";
import { Question } from "src/question/question.entity";
import { Survey } from "src/survey/survey.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Versioning } from "./version.entity";

// @Entity()
// export class QuestionChoices { 
//   // @PrimaryGeneratedColumn('uuid') id: string;
//   // @Column() isAnswer: boolean;
//   // @ManyToOne(() => Question, {
//   //   onDelete:"CASCADE"
//   // })
//   // question: Question;
//   // @Column() answerId:string;
//   // @ManyToOne((type) => Answer, (answer:Answer) =>answer.questionChoices)
//   // answer: Answer; 
//   // @Column(type => Versioning) versioning: Versioning
// }


@Entity()
export class SurveyToQuestionDetail { 
  // @PrimaryGeneratedColumn('uuid') id: string;
  // @Column() result:boolean;
  // @Column() pointInQuestion: boolean;
  // @ManyToOne(() => Question)
  // question:Question
  // @ManyToOne(() => Survey)
  // @JoinColumn()
  // survey:Survey; 
  // @OneToMany(() => Answer,(ans:Answer) => ans)
  // answerUser: Answer[]
  // @Column(type => Versioning) versioning: Versioning
}
@Entity()
export class UserQuestionAnswer { 
  @PrimaryGeneratedColumn("uuid") id:string;
  @ManyToOne(() => SurveyToQuestionDetail,{
    eager:true 
  })
  questionDetail: SurveyToQuestionDetail
  @Column() isRight: boolean;
  // @OneToOne(() => QuestionChoices, {
  //   eager:true
  // })
  // choice: QuestionChoices
  @Column(type => Versioning) versioning: Versioning
}
