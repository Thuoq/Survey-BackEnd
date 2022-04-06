import { Expose } from "class-transformer";

export class IDifficulty { 
  @Expose()
  id:string;
  
  @Expose()
  name:string;
}