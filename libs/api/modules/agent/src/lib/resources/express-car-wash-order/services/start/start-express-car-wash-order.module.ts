import { Module } from '@nestjs/common';
import { AgentStartExpressCarWashOrderService } from './start-express-car-wash-order.service';
import { AgentStartExpressCarWashOrderHelperModule } from './helpers/start-express-car-wash-order-helper.module';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [AgentStartExpressCarWashOrderHelperModule, FcmModule],
  providers: [AgentStartExpressCarWashOrderService],
  exports: [AgentStartExpressCarWashOrderService],
})
export class AgentStartExpressCarWashOrderModule {}
