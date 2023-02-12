import { Injectable } from '@nestjs/common';
import { DrinkEntity } from './drink.entity';
import { AppDataSource } from '../data-source';

@Injectable()
export class DrinkService {
  photoRepository = AppDataSource.getRepository(DrinkEntity);

  async findAll(): Promise<DrinkEntity[]> {
    return await this.photoRepository.find();
  }
}
