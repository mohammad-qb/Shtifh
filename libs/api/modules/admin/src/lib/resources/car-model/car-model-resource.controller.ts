import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { CarModelResourceService } from './car-model-resource.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';

@ApiTags('Car Model')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
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
    @Param('id') carModelId: string
  ) {
    return await this.carModelResourceService.update(carModelId, body);
  }
}
