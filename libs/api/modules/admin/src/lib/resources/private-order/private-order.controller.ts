import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivateOrderService } from './private-order.service';
import { UpdatePrivateOrderDto } from './dto/update.dto';

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

  @Put(':id')
  @ApiOperation({ summary: 'Update Private Order' })
  async update(@Body() body: UpdatePrivateOrderDto, @Param('id') id: string) {
    return await this.privateOrderService.update(id, body);
  }
}
