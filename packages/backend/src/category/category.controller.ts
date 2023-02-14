import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
@UseInterceptors(CacheInterceptor)
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiOperation({ summary: 'Get all the categories' })
  @ApiResponse({ status: 200, description: 'Return the categories' })
  @Get()
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.service.findAll();
  }
}
