import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { OrderResourceService } from './order-resource.service';

@ApiTags('Order')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderResourceController {
  private logger = new Logger(OrderResourceController.name);

  constructor(private readonly orderResourceService: OrderResourceService) {}

  @Get()
  @ApiOperation({ summary: 'List All Orders' })
  async list() {
    return await this.orderResourceService.list();
  }
}
