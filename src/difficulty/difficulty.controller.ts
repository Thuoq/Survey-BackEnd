import { IDifficulty } from './dtos/difficulty.dto';
import { UserRole } from './../common/userRole';
import  RoleGuard  from 'src/auth/role.guard';
import  JwtAuthGuard  from 'src/auth/jwt-auth.guard';
import { IUpdateDifficulty } from './dtos/update-difficulty.dto';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { DifficultyService } from './difficulty.service';
import { Controller, Get, Post, Body, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { ICreateDifficulty } from './dtos/create-difficulty.dto';

@Controller('difficulty')
@UseGuards(RoleGuard(UserRole.ADMIN))
@UseGuards(JwtAuthGuard)
@ApiCookieAuth()
@ApiTags("Difficulty")
export class DifficultyController {
  constructor( private readonly difficultyService:DifficultyService) {}

  @Get()
  async getAllDifficulty():Promise<IDifficulty[]> {
    return await this.difficultyService.getAllDifficulty()

  }
  @Post()
  async createDifficulty(@Body() payload: ICreateDifficulty):Promise<IDifficulty>{
    return await this.difficultyService.createDifficulty(payload)
  }
  @Delete("/:id")
  async deleteDifficulty(@Param('id') id:string):Promise<void> {
    return await this.difficultyService.deleteDifficulty(id)
  }
  @Patch("/:id")
  async updateDifficulty(@Param("id") id:string, @Body() payload:IUpdateDifficulty):Promise<IDifficulty> {
    return await this.difficultyService.updateDifficulty(id,payload); 
  }

  @Get("/:id")
  async getADifficulty(@Param("id") id:string):Promise<IDifficulty> {
    return await this.difficultyService.getADifficulty(id);
  }
}
