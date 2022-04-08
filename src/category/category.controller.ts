import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ICategory } from './dtos/category.dto';
import { IUpdateCategory } from './dtos/update-category.dto';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ICreateCategory } from './dtos/create-category.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/auth/role.guard';
import { UserRole } from 'src/common/userRole';

@Controller('category')
@Serialize(ICategory)
@ApiCookieAuth()
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  
  @Post()
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() body : ICreateCategory):Promise<ICategory> {
     return await this.categoryService.createCategory(body)
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategories():Promise<ICategory[]>{
    return await this.categoryService.getAllCategory()
  }

  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  async updateCategory(@Param("id",new ParseUUIDPipe({version:'4'})) id:string,@Body() attrs: IUpdateCategory):Promise<ICategory> {
  
    return await this.categoryService.updateCategory(id,attrs);
  }
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Delete("/:id") 
  async deleteCategory(@Param("id",new ParseUUIDPipe({version:'4'})) id:string):Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getACategory(@Param("id",new ParseUUIDPipe({version:'4'})) id:string):Promise<ICategory> {
    return await this.categoryService.findOneById(id);
  }
}
