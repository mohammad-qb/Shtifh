import { Module } from "@nestjs/common";
import { CreateCarOrderService } from "./create-car-order.service";
import { DateAccessModule } from "@shtifh/date-access-service";
import { CarOrderUtilsModule } from '../../utils/car-order-utils.module';
import { CreateCarOrderValidatorModule } from './validator/car-order-validator.module';

@Module({
  imports: [DateAccessModule, CarOrderUtilsModule, CreateCarOrderValidatorModule],
  providers: [CreateCarOrderService],
  exports: [CreateCarOrderService],
})
export class CreateCarOrderModule {}
