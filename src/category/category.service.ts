import { PostgresErrorCode } from './../database/error.constraints';
import { IUpdateCategory } from './dtos/update-category.dto';
import { ICreateCategory } from './dtos/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repoCategory: Repository<Category>) {
  }
  async finOneByName(name:string) {
    const category =  await this.repoCategory.findOne({where: {name}})
    if (!category) {
      throw new HttpException(`Do not find Category with name ${name}`,HttpStatus.FORBIDDEN)
    }
    return category;
  }
  async findOneById(id:string ) {
    const category =  await this.repoCategory.findOne({where: {id}})
    if (!category) {
      throw new HttpException(`Do not find Category with id ${id}`,HttpStatus.FORBIDDEN)
    }
    return category;

  }
  async createCategory(payload:ICreateCategory) {
    try {
      const category = this.repoCategory.create(payload)
      await this.repoCategory.save(category)
      return category;
       
    }catch(error) { 
      if(error?.code === PostgresErrorCode.UniqueViolation ) { 
        throw new HttpException(' Category name has exists',HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getAllCategory() {
    return await this.repoCategory.find()
  }
  async updateCategory(id:string, attrs: Partial<IUpdateCategory>) {
    const category = await this.findOneById(id)
    Object.assign(category,attrs)
    
    return await this.repoCategory.save(category);
  }
  async deleteCategory(id:string ) {
    const category = await this.findOneById(id)
    await this.repoCategory.delete({id});
  }
}
