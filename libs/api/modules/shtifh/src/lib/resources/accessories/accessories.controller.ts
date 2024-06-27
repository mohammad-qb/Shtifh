import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessoriesResourceService } from './accessories.service';

@Controller('accessories')
@ApiTags('Accessories')
export class AccessoriesResourceController {
  private logger = new Logger(AccessoriesResourceController.name);

  constructor(private readonly service: AccessoriesResourceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accessories' })
  async list() {
    return await this.service.list();
  }
}
