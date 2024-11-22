import { Module } from '@nestjs/common';
import { CompleteCarOrderService } from './complete-car-order.service';

@Module({
  providers: [CompleteCarOrderService],
  exports: [CompleteCarOrderService],
})
export class CompleteCarOrderModule {}
