import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePrivateOrderDto } from './dto/update.dto';
import { PrivateOrderService } from './private-order.service';
import { ListPrivateOrdersDto } from './dto/list.dto';

@ApiTags('Private Order')
@Controller('private-orders')
export class PrivateOrderController {
  private logger = new Logger(PrivateOrderController.name);

  constructor(private readonly privateOrderService: PrivateOrderService) {}

  @Post()
  @ApiOperation({ summary: 'List all private orders' })
  async list(@Body() body: ListPrivateOrdersDto) {
    return await this.privateOrderService.list(body.cityId);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'List all customer private orders' })
  async customer(@Param('customerId') customerId: string) {
    return await this.privateOrderService.customer(customerId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Private Order' })
  async update(@Body() body: UpdatePrivateOrderDto, @Param('id') id: string) {
    return await this.privateOrderService.update(id, body);
  }
}
