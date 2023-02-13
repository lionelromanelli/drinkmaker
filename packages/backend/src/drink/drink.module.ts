import { Module } from '@nestjs/common';
import { DrinkController } from './drink.controller';
import { DrinkEntity } from './drink.entity';
import { DrinkService } from './drink.service';

@Module({
  imports: [DrinkEntity],
  providers: [DrinkService],
  controllers: [DrinkController],
})
export class DrinkModule {}
