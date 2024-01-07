import { Controller, Get, Logger } from '@nestjs/common';
import { CityResourceService } from './city-resource.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
}
