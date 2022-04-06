import { Difficulty } from './difficulty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DifficultyController } from './difficulty.controller';
import { DifficultyService } from './difficulty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty])],
  controllers: [DifficultyController],
  providers: [DifficultyService],
  exports: [DifficultyService]
})
export class DifficultyModule {}
