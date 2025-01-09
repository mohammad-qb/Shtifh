import { Module } from '@nestjs/common';
import { CalculateOrderFeesService } from './calculate-order-fees.utils';

@Module({
  providers: [CalculateOrderFeesService],
  exports: [CalculateOrderFeesService],
})
export class CarOrderUtilsModule {}
