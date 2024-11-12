import { Module } from "@nestjs/common";
import { GetCarOrderService } from "./get-car-order.service";

@Module({
  providers: [GetCarOrderService],
  exports: [GetCarOrderService]
})
export class GetCarOrderModule {}
