import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { OrderResourceService } from './order-resource.service';
import { ListOrdersDto } from './dto/list.dto';
import { UpdateOrderDto } from './dto/update.dto';

@ApiTags('Order')
@Controller('orders')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class OrderResourceController {
  private logger = new Logger(OrderResourceController.name);

  constructor(private readonly orderResourceService: OrderResourceService) {}

  //TODO: change to post
  @Post()
  @ApiOperation({ summary: 'List All Orders' })
  async list(@Body() body: ListOrdersDto) {
    return await this.orderResourceService.list(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Private Order' })
  async update(@Body() body: UpdateOrderDto, @Param('id') id: string) {
    return await this.orderResourceService.update(id, body);
  }
}
