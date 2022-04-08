import { Question } from 'src/question/question.entity';
import { Category } from './../category/category.entity';
import { Difficulty } from './../difficulty/difficulty.entity';
import { Column, Entity, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn,ManyToMany, JoinTable } from "typeorm";
import { Assignment } from 'src/assignment/assignment.entity';

@Entity()
export class Survey { 
  @PrimaryGeneratedColumn('uuid') id: string; 
  @Column()
  name: string; 
  @ManyToOne(() => Difficulty, { 
    eager:true,
    cascade:true
  })
  difficulty: Difficulty
  @ManyToMany((type) => Question,(q:Question) => q.surveys, {
    cascade:true,
    eager:true
  })
  @JoinTable()
  questions: Question[]
  
  @ManyToOne(() => Category,(category:Category) => category.surveys, {
    eager:true
  })
  category: Category
  @OneToMany(() => Assignment,(assignment:Assignment) => assignment.survey)
  
  assignments:Assignment[]
}