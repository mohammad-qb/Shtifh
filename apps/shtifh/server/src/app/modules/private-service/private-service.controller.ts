import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrivateServiceService } from './private-service.service';
import { ListPrivateServicesEntity } from './entities/list-private-services.entity';

@ApiTags('Private Service')
@Controller('private-services')
export class PrivateServiceController {
  private logger = new Logger(PrivateServiceController.name);

  constructor(private readonly privateServiceService: PrivateServiceService) {}

  @Get()
  @ApiResponse({ type: ListPrivateServicesEntity, isArray: true })
  @ApiOperation({ summary: 'List all private services' })
  async list() {
    return await this.privateServiceService.list();
  }
}
