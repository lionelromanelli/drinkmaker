import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [CategoryEntity],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
