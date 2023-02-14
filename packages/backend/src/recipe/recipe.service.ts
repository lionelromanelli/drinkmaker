import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from './../ingredient/ingredient.entity';

@Injectable()
export class RecipeService {
  recipeRepository = AppDataSource.getRepository(RecipeEntity);
  ingredientRepository = AppDataSource.getRepository(IngredientEntity);

  async findIngredients(id): Promise<IngredientEntity[]> {
    const recipe = await this.recipeRepository.findOneBy({ id });
    return recipe.ingredients;
  }

  async findAll(): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find();
  }

  async findById(id): Promise<RecipeEntity> {
    return await this.recipeRepository.findOneBy({ id });
  }
}
