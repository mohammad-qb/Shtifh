import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivateServiceService } from './private-service.service';
import { CreatePrivateServiceDto } from './private-service.dto';

@ApiTags('Private Service')
@Controller('private-services')
export class PrivateServiceController {
  private logger = new Logger(PrivateServiceController.name);

  constructor(private readonly privateServiceService: PrivateServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create Private Service' })
  async create(@Body() body: CreatePrivateServiceDto) {
    return await this.privateServiceService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List Private Services' })
  async list() {
    return await this.privateServiceService.list();
  }
}
