import { Module } from '@nestjs/common';
import { AgentCompleteExpressCarWashOrderService } from './complete-express-car-wash-order.service';

@Module({
  providers: [AgentCompleteExpressCarWashOrderService],
  exports: [AgentCompleteExpressCarWashOrderService],
})
export class AgentCompleteExpressCarWashOrderModule {}
