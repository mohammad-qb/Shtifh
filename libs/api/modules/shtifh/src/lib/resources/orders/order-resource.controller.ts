import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersEntity } from './entities/list-orders.entity';
import { OrderResourceService } from './order-resource.service';
import { CreateOrderEntity } from './entities/create-order.entity';
import { HeaderLang, Lang } from '@shtifh/decorators';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderResourceController {
  private logger = new Logger(OrderResourceController.name);

  constructor(private readonly orderResourceService: OrderResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ type: CreateOrderEntity })
  async create(
    @Body() body: CreateOrderDto,
    @GetUser() user: Payload,
    @Lang() lang: HeaderLang
  ) {
    return await this.orderResourceService.create(user.id, lang, body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Orders' })
  @ApiResponse({ type: ListOrdersEntity })
  async list(@GetUser() user: Payload) {
    return await this.orderResourceService.list(user.id);
  }
}
