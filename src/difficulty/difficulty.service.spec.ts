import { Test, TestingModule } from '@nestjs/testing';
import { DifficultyService } from './difficulty.service';

describe('DifficultyService', () => {
  let service: DifficultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifficultyService],
    }).compile();

    service = module.get<DifficultyService>(DifficultyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
