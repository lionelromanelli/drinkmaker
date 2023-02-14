import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IngredientEntity } from 'src/ingredient/ingredient.entity';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@ApiTags('recipes')
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

  @ApiOperation({ summary: 'Get one recipe' })
  @ApiResponse({ status: 200, description: 'Return one recipe' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Recipe id',
    schema: { oneOf: [{ type: 'number' }] },
  })
  async getRecipe(@Param('id') id: number): Promise<RecipeEntity> {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'Get recipe ingredients' })
  @ApiResponse({ status: 200, description: 'Return recipe ingredients' })
  @Get(':id_recipe/ingredients')
  @ApiParam({
    name: 'id_recipe',
    required: true,
    description: 'Recipe id',
    schema: { oneOf: [{ type: 'number' }] },
  })
  async getRecipesIngredients(
    @Param('id_recipe') id: number,
  ): Promise<IngredientEntity[]> {
    return await this.service.findIngredients(id);
  }
}
