import { Survey } from './../survey/survey.entity';
import { RefreshToken } from './../common/refreshToken.entity';
import { Versioning } from './../common/version.entity';
import { UserRole } from '../common/userRole';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

import {hash} from 'bcrypt'
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

  @OneToOne(() => RefreshToken, 
  {cascade:true,eager:true,onUpdate:"CASCADE"})
  @JoinColumn()
  refreshToken: RefreshToken;

  // @OneToMany(() => Survey,(survey:Survey) => survey.owner)
  // surveys:Survey
}