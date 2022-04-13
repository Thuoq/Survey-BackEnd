import { Difficulty } from './../difficulty/difficulty.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { DifficultyService } from 'src/difficulty/difficulty.service';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  // let fakeDifficulty:Difficulty = {
  //   id: "dasdas-dasdas-dasdas-xz",
  //   name:"Hard",
  //   surveys: 
  // }
  // const fakeDifficultyService:DifficultyService =  {
  //   findOneDifficultyByName:(name:string) => Promise.resolve(Difficulty),
  //   findOneDifficulty: (id:string) => Promise.resolve({id:"1221-2123x-21312x-1233", name:"Ez"}),
  //   getADifficulty:(id:string) => Promise.resolve({id:"1221-2123x-21312x-1233", name:"Ez"})
  // }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
