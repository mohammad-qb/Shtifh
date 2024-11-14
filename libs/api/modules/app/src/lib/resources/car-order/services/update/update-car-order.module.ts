import { Module } from "@nestjs/common";
import { UpdateCarOrderService } from "./update-car-order.service";
import{DateAccessModule} from '@shtifh/date-access-service';

@Module({
  imports: [DateAccessModule],
  providers: [UpdateCarOrderService],
  exports: [UpdateCarOrderService]
})
export class UpdateCarOrderModule {}
