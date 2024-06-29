import { Controller, Get, Logger } from '@nestjs/common';
import { CarBrandResourceService } from './car-brand.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('car-brands')
@ApiTags('Car Brand')
export class CarBrandResourceController {
  private logger = new Logger(CarBrandResourceController.name);

  constructor(private readonly service: CarBrandResourceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all car brands' })
  async list() {
    return await this.service.list();
  }
}
