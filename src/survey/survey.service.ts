import { QuestionService } from './../question/question.service';
import { ICreateSurvey } from './dtos/create-survey.dto';
import { DifficultyService } from 'src/difficulty/difficulty.service';
import { CategoryService } from 'src/category/category.service';
import { Survey } from './survey.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { string } from '@hapi/joi';

@Injectable()
export class SurveyService {
  
  constructor( 
    @InjectRepository(Survey) private readonly repoSurvey:Repository<Survey>,
    private readonly categoryService:CategoryService,
    private readonly difficultyService: DifficultyService,
    private readonly questionService: QuestionService ) {}

  async findOneSurvey(id:string) {
    const survey = this.repoSurvey.findOne({where:{id}})
    if (!survey) {
      throw new HttpException(`Survey with id not found ${id}`,HttpStatus.NOT_FOUND)
    }
    return survey;
  }
  async createSurvey(payload:ICreateSurvey) {
    const category = await this.categoryService.finOneByName(payload.category)
    const difficulty = await this.difficultyService.findOneDifficultyByName(payload.difficulty)
    let questionsPromise  =  payload.questions.map(async (el:string) => {
      const ques = await this.questionService.findAQuestion(el);
      return ques;
    })
    const questions = await Promise.all(questionsPromise)
    const survey = this.repoSurvey.create({name:payload.name,category,difficulty,questions})
    await this.repoSurvey.save(survey);
    return survey;
  }
  async getAllSurvey() {
    return await this.repoSurvey.find()
  }
  async getOneSurveyById(id:string) {
    return await this.findOneSurvey(id);
  }

  async deleteSurveyById(id:string) {
    const survey = await this.findOneSurvey(id);
    await this.repoSurvey.remove(survey)
    return;
  }
}
