import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers:[CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
