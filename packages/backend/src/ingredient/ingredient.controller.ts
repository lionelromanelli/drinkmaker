import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IngredientEntity } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
@UseInterceptors(CacheInterceptor)
export class IngredientController {
  constructor(private readonly service: IngredientService) {}

  @ApiOperation({ summary: 'Get all the ingredients' })
  @ApiResponse({ status: 200, description: 'Return the ingredients' })
  @Get()
  async getCategories(): Promise<IngredientEntity[]> {
    return await this.service.findAll();
  }
}
