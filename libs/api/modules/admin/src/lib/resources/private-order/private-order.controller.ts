import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivateOrderService } from './private-order.service';
import {
  ActivatePrivateOrderDto,
  UpdatePrivateOrderDto,
} from './dto/update.dto';

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

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'List all customer private orders' })
  async customer(@Param('customerId') customerId: string) {
    return await this.privateOrderService.customer(customerId);
  }

  @Put('activation')
  @ApiOperation({ summary: 'Update Activation Private Order' })
  async activate(@Body() body: ActivatePrivateOrderDto) {
    return await this.privateOrderService.activation(body.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Private Order' })
  async update(@Body() body: UpdatePrivateOrderDto, @Param('id') id: string) {
    return await this.privateOrderService.update(id, body);
  }
}
