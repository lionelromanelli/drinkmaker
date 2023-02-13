import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

describe('AppController', () => {
  let controller: RecipeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [RecipeService],
    }).compile();

    controller = app.get<RecipeController>(RecipeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getRecipes).toBe('Hello World!');
    });
  });
});
