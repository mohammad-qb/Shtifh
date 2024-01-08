import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CarModelResourceService } from './car-model-resource.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { JwtAuthGuard } from '@shtifh/auth-service';

@ApiTags('Car Model')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('card-models')
export class CarModelResourceController {
  private logger = new Logger(CarModelResourceController.name);

  constructor(
    private readonly carModelResourceService: CarModelResourceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create New Car Model' })
  async create(@Body() body: CreateCarModelDto) {
    return await this.carModelResourceService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Car Models' })
  async list() {
    return await this.carModelResourceService.list();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Car Model' })
  async update(
    @Body() body: UpdateCarModelDto,
    @Param('id', ParseIntPipe) carModelId: number
  ) {
    return await this.carModelResourceService.update(carModelId, body);
  }
}
