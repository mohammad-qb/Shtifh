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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { HeaderLang, Lang } from '@shtifh/decorators';
import { Payload } from '@shtifh/user-service';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrdersDto } from './dto/list-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderEntity } from './entities/create-order.entity';
import { RetrieveLastInvoiceEntity } from './entities/last-invoice.entity';
import { UpdateOrderEntity } from './entities/update-order.entity';
import { OrderResourceService } from './order-resource.service';

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

  @Put('/:id')
  @ApiOperation({ summary: 'Update Order' })
  @ApiResponse({ type: UpdateOrderEntity })
  async update(
    @Param('id') id: string,
    @Lang() lang: HeaderLang,
    @Body() body: UpdateOrderDto
  ) {
    return await this.orderResourceService.update(id, body, lang);
  }

  @Post('all')
  @ApiOperation({ summary: 'List All Orders' })
  // @ApiResponse({ type: ListOrdersEntity })
  async list(
    @GetUser() user: Payload,
    @Body() body: ListOrdersDto,
    @Lang() lang: HeaderLang
  ) {
    return await this.orderResourceService.list(user.id, body.isDone, lang);
  }

  @Get('last-invoice')
  @ApiOperation({ summary: 'Retrieve last invoice' })
  @ApiResponse({ type: RetrieveLastInvoiceEntity })
  async lastInvoice(@GetUser() user: Payload) {
    return await this.orderResourceService.lastInvoice(user.id);
  }

  @Get('done/:id')
  @ApiOperation({ summary: 'Make it done' })
  async done(@GetUser() user: Payload, @Param('id') id: string) {
    return await this.orderResourceService.done(id, user.id);
  }

  @Get('next-upcoming')
  @ApiOperation({ summary: 'Get the next upcoming order' })
  async nextUpcoming(@GetUser() user: Payload) {
    return await this.orderResourceService.nextUpcoming(user.id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Cancel Order' })
  async cancelOrder(
    @GetUser() user: Payload,
    @Param('id') id: string,
    @Body() body: CancelOrderDto
  ) {
    return await this.orderResourceService.cancelOrder(id, user, body);
  }
}
