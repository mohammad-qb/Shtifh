import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarModelServiceService } from './car-model-service.service';
import { CreateCarModelServiceDto } from './dto/create.dto';
import { UpdateCarModelServiceDto } from './dto/update.dto';

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

  @Put()
  @ApiOperation({ summary: 'update Car Model Service' })
  async update(@Body() body: UpdateCarModelServiceDto) {
    return await this.carModelServiceService.update(body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete Car Model Service' })
  async delete(@Param('id') id: string) {
    return await this.carModelServiceService.delete(id);
  }
}
