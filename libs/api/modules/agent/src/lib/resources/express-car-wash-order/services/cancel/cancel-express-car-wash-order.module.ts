import { Module } from '@nestjs/common';
import { AgentCancelExpressCarWashOrderService } from './cancel-express-car-wash-order.service';

@Module({
  providers: [AgentCancelExpressCarWashOrderService],
  exports: [AgentCancelExpressCarWashOrderService],
})
export class AgentCancelExpressCarWashOrderModule {}
