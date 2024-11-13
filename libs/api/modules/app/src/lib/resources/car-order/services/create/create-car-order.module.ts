import { Module } from "@nestjs/common";
import { CreateCarOrderService } from "./create-car-order.service";
import { DateAccessModule } from "@shtifh/date-access-service";

@Module({
  imports: [DateAccessModule],
  providers: [CreateCarOrderService],
  exports: [CreateCarOrderService],
})
export class CreateCarOrderModule {}
