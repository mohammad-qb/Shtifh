import { Module } from '@nestjs/common';
import { CreateExpressCarWashOrderService } from './create-express-car-wash-order.service';
import { GetAvailableAgentsService } from '../../../../utils/get-available-agents.service';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [FcmModule],
  providers: [CreateExpressCarWashOrderService, GetAvailableAgentsService],
  exports: [CreateExpressCarWashOrderService],
})
export class CreateExpressCarWashOrderModule {}
