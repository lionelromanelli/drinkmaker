import { CacheModule, Module } from '@nestjs/common';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
    }),
    DrinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
