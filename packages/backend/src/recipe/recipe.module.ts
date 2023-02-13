import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports: [RecipeEntity],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
