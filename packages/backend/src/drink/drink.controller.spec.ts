import { Test, TestingModule } from '@nestjs/testing';
import { DrinkController } from './drink.controller';
import { DrinkService } from './drink.service';

describe('AppController', () => {
  let drinkController: DrinkController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DrinkController],
      providers: [DrinkService],
    }).compile();

    drinkController = app.get<DrinkController>(DrinkController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(drinkController.getDrinks).toBe('Hello World!');
    });
  });
});
