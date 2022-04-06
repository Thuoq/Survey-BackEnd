import { Expose } from "class-transformer";

export class ICategory { 
  
  @Expose()
  id:string
  
  @Expose()
  name:string;
}