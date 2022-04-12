import { ICreateAnswer } from './dtos/create-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { IUpdateAnswer } from './dtos/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor( @InjectRepository(Answer) private readonly repoAnswer:Repository<Answer>) {}

  async findOneAnswerById(id:string) {
    const answer = await this.repoAnswer.findOne({where:{id}})
    if(!answer) {
      throw new HttpException(`answer with ${id} not found`,HttpStatus.NOT_FOUND)
    }
    return answer;
  }
  async getOneAnswerById(id:string) {
    return await this.findOneAnswerById(id);
  } 
  async getAllAnswer() {
    return await this.repoAnswer.find()
  }
  async createAnswer(payload:ICreateAnswer) {
    const answer = await this.repoAnswer.create(payload)
    return await this.repoAnswer.save(answer);
  }
  async updateAnswer(id:string, attrs: Partial<IUpdateAnswer>) {
    
    const answer = await this.findOneAnswerById(id)
    Object.assign(answer,attrs)
    await this.repoAnswer.save(answer);
    return answer;
  }
  async deleteAnswer(id:string) {
    const answer = await this.findOneAnswerById(id);
    await this.repoAnswer.remove(answer);
    return;
  }
}
