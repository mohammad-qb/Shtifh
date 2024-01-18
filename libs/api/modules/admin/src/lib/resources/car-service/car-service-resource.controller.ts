import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { CarServiceResourceService } from './car-service-resource.service';

@ApiTags('Car Service')
@Controller('car-services')
export class CarServiceResourceController {
  private logger = new Logger(CarServiceResourceController.name);

  constructor(
    private readonly carServiceResourceService: CarServiceResourceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a car service' })
  async create(@Body() body: CreateCarServiceDto) {
    return await this.carServiceResourceService.create(body);
  }
}
