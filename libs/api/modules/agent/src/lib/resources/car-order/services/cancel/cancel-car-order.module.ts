import { Module } from "@nestjs/common";
import { CancelCarOrderService } from "./cancel-car-order.service";

@Module({
  providers: [CancelCarOrderService],
  exports: [CancelCarOrderService],
})
export class CancelCarOrderModule {}
