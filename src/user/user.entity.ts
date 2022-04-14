import { Versioning } from './../common/version.entity';
import { UserRole } from '../common/userRole';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

import {hash} from 'bcrypt'
import { Assignment } from "../assignment/assignment.entity";
@Entity()
export class User { 
  @PrimaryGeneratedColumn("uuid") id: string 
  @Column({unique:true})
  username:string 

  @Column()
  @Exclude()
  password:string 

  @BeforeInsert()
  async encryptPassword() {
    const hashPassword = await hash(this.password, 10);
    this.password = hashPassword;
  }
  @Column('bool',{default:false})
  isActive: boolean
  @Column({
    type:'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole
  @Column(type => Versioning)
  versioning:Versioning
  @OneToMany(() => Assignment,(assignment:Assignment) => assignment.owner)
  assignments: Assignment[]
  // surveys:Survey
}