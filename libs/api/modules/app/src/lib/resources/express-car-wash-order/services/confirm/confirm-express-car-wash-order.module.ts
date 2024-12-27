import { Module } from "@nestjs/common";
import { DateAccessModule } from "@shtifh/date-access-service";
import { ConfirmExpressCarWashOrderService } from "./confirm-express-car-wash-order.service";

@Module({
  imports: [DateAccessModule],
  providers: [ConfirmExpressCarWashOrderService],
  exports: [ConfirmExpressCarWashOrderService]
})
export class ConfirmExpressCarWashOrderModule {}
