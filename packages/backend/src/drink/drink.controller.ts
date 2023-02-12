import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DrinkEntity } from './drink.entity';
import { DrinkService } from './drink.service';

@ApiTags('drinks')
@Controller('drinks')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @ApiOperation({ summary: 'Get all drinks' })
  @ApiResponse({ status: 200, description: 'Return all drinks.' })
  @Get()
  async getDrinks(): Promise<DrinkEntity[]> {
    return await this.drinkService.findAll();
  }
}
