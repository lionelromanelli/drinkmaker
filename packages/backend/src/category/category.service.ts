import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { AppDataSource } from '../data-source';

@Injectable()
export class CategoryService {
  repository = AppDataSource.getRepository(CategoryEntity);

  async findAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }
}
