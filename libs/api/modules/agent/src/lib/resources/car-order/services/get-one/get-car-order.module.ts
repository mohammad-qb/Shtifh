import { Module } from '@nestjs/common';
import { AgentGetCarOrderService } from './get-car-order.service';

@Module({
  providers: [AgentGetCarOrderService],
  exports: [AgentGetCarOrderService],
})
export class AgentGetCarOrderModule {}
