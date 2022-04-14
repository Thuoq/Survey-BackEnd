import { Survey } from '../survey/survey.entity';
import { Question } from './../question/question.entity';
import { Versioning } from "../common/version.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Difficulty  {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({unique:true}) name: string;
  @Column(type => Versioning) versioning: Versioning
  @OneToMany(() => Question,(question:Question) => {
    question.difficulty
  }, { 
    cascade:true
  })
  questions: Question[]
  @OneToMany(() => Survey, (sur:Survey) => sur.difficulty, {
    onDelete:"CASCADE"
  })
  surveys: Survey[]
}