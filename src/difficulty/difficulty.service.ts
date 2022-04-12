import { PostgresErrorCode } from './../database/error.constraints';
import { IUpdateDifficulty } from './dtos/update-difficulty.dto';
import { ICreateDifficulty } from './dtos/create-difficulty.dto';
import { Difficulty } from './difficulty.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DifficultyService {
  constructor(@InjectRepository(Difficulty) private readonly difficultyRepo: Repository<Difficulty>) {}

  async findOneDifficultyByName(name:string) {
    const diff = await this.difficultyRepo.findOne({where:{name}})
    if(!diff) { 
      throw new HttpException(`Difficulty with id do not exits ${name} `,HttpStatus.NOT_FOUND)
    }
    return diff;
  }
  
  async findOneDifficulty(id:string) {
    const diff = await this.difficultyRepo.findOne({where:{id}})
    if(!diff) { 
      throw new HttpException(`Difficulty with id do not exits ${id} `,HttpStatus.NOT_FOUND)
    }
    return diff;
  }
  async getADifficulty(id:string) {
    return await this.findOneDifficulty(id)
  }
  async getAllDifficulty() {
    return await this.difficultyRepo.find()
  }
  async createDifficulty(payload: ICreateDifficulty) {
    try { 
      const difficulty =  this.difficultyRepo.create(payload)
      await this.difficultyRepo.save(difficulty)
      return difficulty;
    }catch(error) { 
      if(error?.code === PostgresErrorCode.UniqueViolation ) { 
        throw new HttpException(' difficulty name has exists',HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updateDifficulty(id:string, payload:Partial< IUpdateDifficulty>) { 
    const difficulty = await this.findOneDifficulty(id)
    Object.assign(difficulty,payload)
    await this.difficultyRepo.save(difficulty)
    return difficulty;
  }
  async deleteDifficulty(id:string) {
    const difficulty = await this.findOneDifficulty(id)
    await this.difficultyRepo.delete({id:difficulty.id})
  }
}
