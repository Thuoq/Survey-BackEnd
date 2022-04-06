import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@Module({
  controllers: [AnswerController],
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
