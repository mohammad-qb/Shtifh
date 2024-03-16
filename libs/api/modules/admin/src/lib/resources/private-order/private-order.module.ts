import { Module } from '@nestjs/common';
import { PrivateOrderController } from './private-order.controller';
import { PrivateOrderService } from './private-order.service';

@Module({
  imports: [],
  providers: [PrivateOrderController, PrivateOrderService],
  controllers: [PrivateOrderController],
})
export class PrivateOrderModule {}
