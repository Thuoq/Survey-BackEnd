import { Answer } from 'src/answer/answer.entity';
import { Survey } from 'src/survey/survey.entity';
import { Category } from './../category/category.entity';
import { Difficulty } from './../difficulty/difficulty.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn ,ManyToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import { Versioning } from 'src/common/version.entity';
import { AssignmentDetail } from 'src/common/assignment-detail.entity';

@Entity()
export class Question { 
  @PrimaryGeneratedColumn('uuid') id:string;

  @Column() name:string;
  @Column(type => Versioning) versioning:Versioning
  
  @ManyToOne((type) => Difficulty, { 
    eager:true
  }) 
  difficulty: Difficulty;
 
  @ManyToMany((type) => Category,(category:Category) => category.questions,{ 
    eager:true,
    onDelete:"CASCADE",
  })
  @JoinTable()
  category: Category[];

  @ManyToMany((type) => Survey, (sur:Survey) => sur.questions, 
  {
    // cascade:true,
    onDelete:"CASCADE"
  })
  surveys:Survey[]
  @OneToMany((type) => AssignmentDetail, (assignmentDetail:AssignmentDetail) =>assignmentDetail.question)
  assignmentDetail: AssignmentDetail[]
  @OneToMany(() => Answer , (ans: Answer) => ans.question , {
    eager:true,
    cascade:true,
    onDelete: "CASCADE"
  })
  answers: Answer[]
}