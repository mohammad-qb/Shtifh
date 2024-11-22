import { Module } from '@nestjs/common';
import { ListCarWashOrdersService } from './list-car-wash-orders.service';

@Module({
  providers: [ListCarWashOrdersService],
  exports: [ListCarWashOrdersService],
})
export class ListCarWashOrdersModule {}
