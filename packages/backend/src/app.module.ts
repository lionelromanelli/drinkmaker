import { CacheModule, Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 600000,
    }),
    RecipeModule,
    CategoryModule,
    IngredientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
