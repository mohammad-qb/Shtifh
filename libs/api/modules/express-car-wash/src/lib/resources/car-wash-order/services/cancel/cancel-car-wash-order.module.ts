import { Module } from "@nestjs/common";
import { CancelCarWashOrderService } from "./cancel-car-wash-order.service";

@Module({
  providers: [CancelCarWashOrderService],
  exports: [CancelCarWashOrderService],
})
export class CancelCarWashOrderModule {}
