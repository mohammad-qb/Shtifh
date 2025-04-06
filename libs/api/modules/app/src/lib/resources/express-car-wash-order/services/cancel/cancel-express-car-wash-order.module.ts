import { Module } from '@nestjs/common';
import { CancelExpressCarWashOrderService } from './cancel-express-car-wash-order.service';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [FcmModule],
  providers: [CancelExpressCarWashOrderService],
  exports: [CancelExpressCarWashOrderService],
})
export class CancelExpressCarWashOrderModule {}
