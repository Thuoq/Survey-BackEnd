import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from 'src/survey/survey.module';
import { AssignmentController } from './assignment.controller';
import { Assignment } from './assignment.entity';
import { AssignmentService } from './assignment.service';

@Module({
  controllers: [AssignmentController],
  imports:[ TypeOrmModule.forFeature([Assignment]),SurveyModule],
  providers:[ AssignmentService]
})
export class AssignmentModule {}
