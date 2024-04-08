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
import { CityResourceService } from './city-resource.service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';
import { CreateUnavailableSlot } from './dto/create-unavailable-slot.dto';

@ApiTags('City')
@Controller('cities')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class CityResourceController {
  private logger = new Logger(CityResourceController.name);

  constructor(private readonly cityResourceService: CityResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create New City' })
  async create(@Body() body: CreateCityDro) {
    return await this.cityResourceService.create(body);
  }

  @Post()
  @ApiOperation({ summary: 'Add Unavailable Slot' })
  async createUnavailableSlot(@Body() body: CreateUnavailableSlot) {
    return await this.cityResourceService.unavailableSlot(body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Cities' })
  async list() {
    return await this.cityResourceService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'retrieve City' })
  async retrieve(@Param('id') cityId: string) {
    return await this.cityResourceService.retrieve(cityId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update City' })
  async update(@Body() body: UpdateCityDro, @Param('id') cityId: string) {
    return await this.cityResourceService.update(cityId, body);
  }
}
