import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipes')
@UseInterceptors(CacheInterceptor)
export class RecipeController {
  constructor(private readonly service: RecipeService) {}

  @ApiOperation({ summary: 'Get all the recipes' })
  @ApiResponse({ status: 200, description: 'Return the recipes' })
  @Get()
  async getRecipes(): Promise<RecipeEntity[]> {
    return await this.service.findAll();
  }
}
