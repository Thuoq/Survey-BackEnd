import { Test, TestingModule } from '@nestjs/testing';
import { DifficultyController } from './difficulty.controller';

describe('DifficultyController', () => {
  let controller: DifficultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DifficultyController],
    }).compile();

    controller = module.get<DifficultyController>(DifficultyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
