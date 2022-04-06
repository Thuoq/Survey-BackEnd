import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { User } from './../user/user.entity';
import { Versioning } from './version.entity';
import { BeforeInsert, Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import {hash} from 'bcrypt'
@Entity()
export class RefreshToken  {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() refreshToken: string;
  @Column(type => Versioning) 
  versioning: Versioning;
  @BeforeInsert()
  async encryptToken() {
    const hashToken = await hash(this.refreshToken, 10);
    this.refreshToken = hashToken;
  }
  @OneToOne(type => User,(user:User) =>   user.refreshToken , {onUpdate:"CASCADE"})
  user: User;
}