import { AnswerService } from './../answer/answer.service';
import { DifficultyService } from 'src/difficulty/difficulty.service';
import { CategoryService } from 'src/category/category.service';

import { Injectable, Param } from '@nestjs/common';
import { IUpdateQuestion } from './dtos/update-question.dto';
import { ICreateQuestion } from './dtos/create-question.dto';
import { Question } from 'src/question/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {  HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
   constructor(@InjectRepository(Question) private readonly  repoQuestion: Repository<Question>,
    private readonly categoryService: CategoryService,
              private readonly difficultyService: DifficultyService,
              private readonly answerService: AnswerService) {}

  async findAQuestion(id:string) {
    const question  = await this.repoQuestion.findOne({where:{id}})
    if (!question) {
      throw new HttpException("Question not found with id", HttpStatus.NOT_FOUND)
    }
    return question
  } 
  async getAQuestion(id:string) {
    return await this.findAQuestion(id);
  }
  async createQuestion(payload:ICreateQuestion) {
    let categories =  []
    await Promise.all(payload.category.map(async(name) => await this.categoryService.finOneByName(name))).then(val =>  categories = val);
    const difficulty = await this.difficultyService.findOneDifficultyByName(payload.difficulty)

     const newQuestion =  this.repoQuestion.create(
       {name:payload.name, category:categories,difficulty,answers:payload.answers}
     )
     await this.repoQuestion.save(newQuestion)
    return newQuestion;
  }
  async updateQuestion(id:string, payload: Partial<IUpdateQuestion>) {
    const question = await this.findAQuestion(id)
    Object.assign(question,payload)
    return await this.repoQuestion.save(question);
  }
  async getAllQuestion() {
    return await this.repoQuestion.find()
  }
  async deleteQuestion( id:string) {
    const question = await this.findAQuestion(id);
    await this.repoQuestion.remove(question);
    return;

  }
}
