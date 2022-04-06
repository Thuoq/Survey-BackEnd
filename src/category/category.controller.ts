import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ICategory } from './dtos/category.dto';
import { IUpdateCategory } from './dtos/update-category.dto';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ICreateCategory } from './dtos/create-category.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';

@Controller('category')
@Serialize(ICategory)
@UseGuards(JwtAuthGuard)
@ApiCookieAuth()
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post()
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async createCategory(@Body() body : ICreateCategory):Promise<ICategory> {
     return await this.categoryService.createCategory(body)
  }
  @Get()
  async getAllCategories():Promise<ICategory[]>{
    return await this.categoryService.getAllCategory()
  }

  @UseGuards(RoleGuard(UserRole.ADMIN))
  @Patch("/:id")
  async updateCategory(@Param("id") id:string,@Body() attrs: IUpdateCategory):Promise<ICategory> {
  
    return await this.categoryService.updateCategory(id,attrs);
  }
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @Delete("/:id") 
  async deleteCategory(@Param("id") id:string):Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
  
  @Get("/:id")
  async getACategory(@Param("id") id:string):Promise<ICategory> {
    return await this.categoryService.findOneById(id);
  }
}
