import { Body, Controller, Logger, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { CarServiceResourceService } from './car-service-resource.service';
import { ChangeVisibilityDto } from './dto/change.dto';
import { ChangeVisibilityEntity } from './entities/change.entity';
import { ChangeManyVisibilityDto } from './dto/change-many-visibility.dto';

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

  @Put('visibility')
  @ApiOperation({ summary: 'Update a car service visibility' })
  @ApiResponse({ type: ChangeVisibilityEntity })
  async changeVisibility(@Body() body: ChangeVisibilityDto) {
    return await this.carServiceResourceService.changeVisibility(body);
  }

  @Put('all-visibility')
  @ApiOperation({ summary: 'Update all car service visibility for city' })
  @ApiResponse({ type: ChangeVisibilityEntity })
  async changeManyVisibility(@Body() body: ChangeManyVisibilityDto) {
    return await this.carServiceResourceService.changeManyVisibility(body);
  }
}
