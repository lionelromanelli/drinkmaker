import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DrinkEntity } from './drink.entity';
import { DrinkService } from './drink.service';

@Controller('drinks')
@UseInterceptors(CacheInterceptor)
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @ApiOperation({ summary: 'Get all drinks' })
  @ApiResponse({ status: 200, description: 'Return all drinks.' })
  @Get()
  async getDrinks(): Promise<DrinkEntity[]> {
    return await this.drinkService.findAll();
  }
}
