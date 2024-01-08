import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { CustomerResourceService } from './customer-resource.service';

@ApiTags('Customer')
@Controller('customers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomerResourceController {
  private logger = new Logger(CustomerResourceController.name);

  constructor(
    private readonly customerResourceService: CustomerResourceService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List All Customers' })
  async list() {
    return await this.customerResourceService.list();
  }
}
