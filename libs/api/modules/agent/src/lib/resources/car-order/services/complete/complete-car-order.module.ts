import { Module } from '@nestjs/common';
import { AgentCompleteCarOrderService } from './complete-car-order.service';

@Module({
  providers: [AgentCompleteCarOrderService],
  exports: [AgentCompleteCarOrderService],
})
export class AgentCompleteCarOrderModule {}
