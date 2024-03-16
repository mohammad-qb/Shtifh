import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivateOrderService } from './private-order.service';

@ApiTags('Private Order')
@Controller('private-orders')
export class PrivateOrderController {
  private logger = new Logger(PrivateOrderController.name);

  constructor(private readonly privateOrderService: PrivateOrderService) {}

  @Get()
  @ApiOperation({ summary: 'List all private orders' })
  async list() {
    return await this.privateOrderService.list();
  }
}
