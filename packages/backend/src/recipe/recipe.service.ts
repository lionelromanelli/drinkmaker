import { Injectable } from '@nestjs/common';
import { RecipeEntity } from './recipe.entity';
import { AppDataSource } from '../data-source';

@Injectable()
export class RecipeService {
  repository = AppDataSource.getRepository(RecipeEntity);

  async findAll(): Promise<RecipeEntity[]> {
    return await this.repository.find();
  }
}
