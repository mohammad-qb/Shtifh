import { Module } from '@nestjs/common';
import { AgentAcceptExpressCarWashOrderService } from './accept-express-car-wash-order.service';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [FcmModule],
  providers: [AgentAcceptExpressCarWashOrderService],
  exports: [AgentAcceptExpressCarWashOrderService],
})
export class AgentAcceptExpressCarWashOrderModule {}
