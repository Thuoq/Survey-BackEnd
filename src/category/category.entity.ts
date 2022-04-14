import { Question } from '../question/question.entity';
import { Survey } from './../survey/survey.entity';
import { Versioning } from "../common/version.entity";
import { Column, Entity, PrimaryGeneratedColumn ,OneToMany, ManyToMany} from "typeorm";

@Entity()
export class Category  {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({unique:true}) name: string;
  @Column(type => Versioning) versioning: Versioning
  @OneToMany(() => Survey,(survey:Survey) => survey.category)
  surveys: Survey[];
  @ManyToMany(() => Question,(q:Question) => q.category, {
    cascade:true,
    onDelete:"CASCADE"
  })
  questions:Question[]
}