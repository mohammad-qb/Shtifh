import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CityResourceService } from './city-resource.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListSlotsDto } from './dto/slots.dto';
import { ListCarModelsByCityEntity } from './entities/list-car-models';
import { HeaderLang, Lang } from '@shtifh/decorators';

@ApiTags('City')
@Controller('cities')
export class CityResourceController {
  private logger = new Logger(CityResourceController.name);

  constructor(private readonly cityResourceService: CityResourceService) {}

  @Get()
  @ApiOperation({ summary: 'List all cities' })
  async list(@Lang() lang: HeaderLang) {
    return await this.cityResourceService.list(lang);
  }

  @Get('days-off/:id')
  @ApiOperation({ summary: 'List all days off for city' })
  async daysOff(@Param('id') id: string) {
    return await this.cityResourceService.daysOff(id);
  }

  @Post('slots')
  @ApiOperation({ summary: 'List all City slots' })
  async slots(@Body() body: ListSlotsDto) {
    return await this.cityResourceService.slots(body);
  }

  @Get('car-models/:id')
  @ApiOperation({ summary: 'List all City car models' })
  @ApiResponse({ type: ListCarModelsByCityEntity })
  async carModels(@Param('id') id: string) {
    return await this.cityResourceService.carModels(id);
  }
}
