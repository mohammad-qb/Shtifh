import { Module } from "@nestjs/common";
import { CancelExpressCarWashOrderService } from "./cancel-express-car-wash-order.service";

@Module({
  providers: [CancelExpressCarWashOrderService],
  exports: [CancelExpressCarWashOrderService],
})
export class CancelExpressCarWashOrderModule {}
