import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrivateOrderService } from './private-order.service';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';
import { CreatePrivateOrderDto } from './dto/create-private-order.dto';
import { ListPrivateOrdersEntity } from './entities/list-private-orders.entity';
import { CreatePrivateOrderEntity } from './entities/create-private-order.entity';

@ApiTags('Private Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('private-orders')
export class PrivateOrderController {
  private logger = new Logger(PrivateOrderController.name);

  constructor(private readonly privateOrderService: PrivateOrderService) {}

  @Get()
  @ApiOperation({ summary: 'List all private orders' })
  @ApiResponse({ type: ListPrivateOrdersEntity, isArray: true })
  async list(@GetUser() user: Payload) {
    console.log({ user });
    return await this.privateOrderService.list(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'create new private orders' })
  @ApiResponse({ type: CreatePrivateOrderEntity })
  async create(@Body() body: CreatePrivateOrderDto, @GetUser() user: Payload) {
    return await this.privateOrderService.create(user.id, body);
  }
}
