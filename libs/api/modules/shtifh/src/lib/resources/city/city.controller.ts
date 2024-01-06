import { Controller, Get, Logger } from '@nestjs/common';
import { CityShtifhService } from './city.service';

@Controller('cities')
export class CityShtifhController {
  private logger = new Logger(CityShtifhController.name);

  constructor(private readonly cityShtifhService: CityShtifhService) {}

  @Get()
  async list() {
    return await this.cityShtifhService.list();
  }
}
