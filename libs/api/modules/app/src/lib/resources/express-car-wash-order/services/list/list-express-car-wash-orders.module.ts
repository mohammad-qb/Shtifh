import { Module } from '@nestjs/common';
import { ListExpressCarWashOrdersService } from './list-express-car-wash-orders.service';

@Module({
  providers: [ListExpressCarWashOrdersService],
  exports: [ListExpressCarWashOrdersService],
})
export class ListExpressCarWashOrdersModule {}
