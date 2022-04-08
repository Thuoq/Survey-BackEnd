// import { OneToOne } from 'typeorm';
// import { User } from './../user/user.entity';
// import { Versioning } from './version.entity';
// import {  Column } from 'typeorm';
// import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class RefreshToken  {
//   @PrimaryGeneratedColumn('uuid') id: string;
//   @Column() refreshToken: string;
//   @Column(type => Versioning) 
//   versioning: Versioning;
//   @OneToOne(type => User,(user:User) =>   user.refreshToken , {onUpdate:"CASCADE"})
//   user: User;
// }