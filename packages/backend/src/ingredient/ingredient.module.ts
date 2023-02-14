import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientEntity } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [IngredientEntity],
  providers: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {}
