import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { CarServiceResourceService } from './car-service-resource.service';
import { JwtAuthGuard } from '@shtifh/auth-service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListCarServicesByCityAndCarModel } from './dto/list-by-city-and-car-model.dto';
import { ListCarServicesEntity } from './entities/list-car-services.entity';

@ApiTags('Car Services')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('car-services')
export class CarServiceResourceController {
  private logger = new Logger(CarServiceResourceController.name);

  constructor(
    private readonly carServiceResourceService: CarServiceResourceService
  ) {}

  @Post('')
  @ApiOperation({ summary: 'List Car services by City and Car Model' })
  @ApiResponse({
    type: ListCarServicesEntity,
    isArray: true,
  })
  async list(@Body() body: ListCarServicesByCityAndCarModel) {
    return await this.carServiceResourceService.listByCityAndCarModel(body);
  }
}
