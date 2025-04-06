import { Module } from '@nestjs/common';
import { DateAccessModule } from '@shtifh/date-access-service';
import { ConfirmExpressCarWashOrderService } from './confirm-express-car-wash-order.service';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [DateAccessModule, FcmModule],
  providers: [ConfirmExpressCarWashOrderService],
  exports: [ConfirmExpressCarWashOrderService],
})
export class ConfirmExpressCarWashOrderModule {}
