import { CacheModule, Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
    }),
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
