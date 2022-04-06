import { CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class Versioning { 
  @CreateDateColumn() create_at: Date
  @UpdateDateColumn() modified_at: Date
  @VersionColumn() revision: number
}