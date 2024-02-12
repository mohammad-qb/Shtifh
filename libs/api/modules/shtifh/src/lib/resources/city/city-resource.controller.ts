import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CityResourceService } from './city-resource.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListSlotsDto } from './dto/slots.dto';

@ApiTags('City')
@Controller('cities')
export class CityResourceController {
  private logger = new Logger(CityResourceController.name);

  constructor(private readonly cityResourceService: CityResourceService) {}

  @Get()
  @ApiOperation({ summary: 'List all cities' })
  async list() {
    return await this.cityResourceService.list();
  }

  @Post('slots')
  @ApiOperation({ summary: 'List all City slots' })
  async slots(@Body() body: ListSlotsDto) {
    return await this.cityResourceService.slots(body);
  }
}
