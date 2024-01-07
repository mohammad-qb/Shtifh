import { Controller, Get, Logger } from '@nestjs/common';
import { CityShtifhService } from './city.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('City')
@Controller('cities')
export class CityShtifhController {
  private logger = new Logger(CityShtifhController.name);

  constructor(private readonly cityShtifhService: CityShtifhService) {}

  @Get()
  @ApiOperation({ summary: 'List all cities' })
  async list() {
    return await this.cityShtifhService.list();
  }
}
