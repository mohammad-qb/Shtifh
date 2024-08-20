import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityResourceService } from './city-resource.service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';

@ApiTags('City')
@Controller('cities')
export class CityResourceController {
  private logger = new Logger(CityResourceController.name);

  constructor(private readonly cityResourceService: CityResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create New City' })
  async create(@Body() body: CreateCityDro) {
    return await this.cityResourceService.create(body);
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
