import { Module } from "@nestjs/common";
import { AgentStartExpressCarWashOrderService } from "./start-express-car-wash-order.service";
import { AgentStartExpressCarWashOrderHelperModule } from './helpers/start-express-car-wash-order-helper.module';

@Module({
  imports: [AgentStartExpressCarWashOrderHelperModule],
  providers: [AgentStartExpressCarWashOrderService],
  exports: [AgentStartExpressCarWashOrderService],
})
export class AgentAcceptExpressCarWashOrderModule {}
