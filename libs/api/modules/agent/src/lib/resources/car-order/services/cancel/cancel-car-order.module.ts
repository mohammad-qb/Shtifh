import { Module } from '@nestjs/common';
import { AgentCancelCarOrderService } from './cancel-car-order.service';

@Module({
  providers: [AgentCancelCarOrderService],
  exports: [AgentCancelCarOrderService],
})
export class AgentCancelCarOrderModule {}
