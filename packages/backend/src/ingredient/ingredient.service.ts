import { Injectable } from '@nestjs/common';
import { IngredientEntity } from './ingredient.entity';
import { AppDataSource } from '../data-source';

@Injectable()
export class IngredientService {
  repository = AppDataSource.getRepository(IngredientEntity);

  async findAll(): Promise<IngredientEntity[]> {
    return await this.repository.find();
  }
}
