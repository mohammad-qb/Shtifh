import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarModelServiceService } from './car-model-service.service';
import { CreateCarModelServiceDto } from './dto/create.dto';

@ApiTags('Car Model Service')
@Controller('car-model-services')
export class CarModelServiceController {
  private logger = new Logger(CarModelServiceController.name);

  constructor(
    private readonly carModelServiceService: CarModelServiceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Car Model Service' })
  async create(@Body() body: CreateCarModelServiceDto) {
    return await this.carModelServiceService.create(body);
  }
}
