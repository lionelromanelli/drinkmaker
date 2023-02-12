import { Module } from '@nestjs/common';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [DrinkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
