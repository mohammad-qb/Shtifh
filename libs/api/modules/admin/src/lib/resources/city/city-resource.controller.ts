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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { CityResourceService } from './city-resource.service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';

@ApiTags('City')
@Controller('cities')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
  async retrieve(@Param('id', ParseIntPipe) cityId: number) {
    return await this.cityResourceService.retrieve(cityId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update City' })
  async update(
    @Body() body: UpdateCityDro,
    @Param('id', ParseIntPipe) cityId: number
  ) {
    return await this.cityResourceService.update(cityId, body);
  }
}
