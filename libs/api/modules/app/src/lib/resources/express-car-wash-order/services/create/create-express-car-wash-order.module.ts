import { Module } from "@nestjs/common";
import { CreateExpressCarWashOrderService } from "./create-express-car-wash-order.service";

@Module({
  providers: [CreateExpressCarWashOrderService],
  exports: [CreateExpressCarWashOrderService],
})
export class CreateExpressCarWashOrderModule {}
