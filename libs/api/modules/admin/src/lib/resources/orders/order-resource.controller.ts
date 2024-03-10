import { Body, Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { OrderResourceService } from './order-resource.service';
import { ListOrdersDto } from './dto/list.dto';

@ApiTags('Order')
@Controller('orders')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class OrderResourceController {
  private logger = new Logger(OrderResourceController.name);

  constructor(private readonly orderResourceService: OrderResourceService) {}

  //TODO: change to post
  @Get()
  @ApiOperation({ summary: 'List All Orders' })
  async list(@Body() body: ListOrdersDto) {
    return await this.orderResourceService.list(body);
  }
}
