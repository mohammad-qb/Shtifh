import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderResourceService } from './order-resource.service';
import { JwtAuthGuard } from '@shtifh/auth-service';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderResourceController {
  private logger = new Logger(OrderResourceController.name);

  constructor(private readonly orderResourceService: OrderResourceService) {}
}
