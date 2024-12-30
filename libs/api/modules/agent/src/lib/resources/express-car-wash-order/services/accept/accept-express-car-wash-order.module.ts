import { Module } from "@nestjs/common";
import { AgentAcceptExpressCarWashOrderService } from "./accept-express-car-wash-order.service";

@Module({
  providers: [AgentAcceptExpressCarWashOrderService],
  exports: [AgentAcceptExpressCarWashOrderService],
})
export class AgentAcceptExpressCarWashOrderModule {}
