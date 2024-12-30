import { Module } from "@nestjs/common";
import { AgentStartExpressCarWashOrderService } from "./start-express-car-wash-order.service";

@Module({
  providers: [AgentStartExpressCarWashOrderService],
  exports: [AgentStartExpressCarWashOrderService],
})
export class AgentAcceptExpressCarWashOrderModule {}
