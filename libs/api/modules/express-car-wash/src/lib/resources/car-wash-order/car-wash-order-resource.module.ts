import { Module } from '@nestjs/common';
import { ListCarWashOrdersModule } from './services/list/list-car-wash-orders.module';
import { CancelCarWashOrderModule } from './services/cancel/cancel-car-wash-order.module';
import { CarWashOrderResourceResolver } from './car-wash-order-resource.resolver';
import { CarWashOrderResourceService } from './car-wash-order-resource.service';

@Module({
  imports: [ListCarWashOrdersModule, CancelCarWashOrderModule],
  providers: [CarWashOrderResourceResolver, CarWashOrderResourceService],
  exports: [CarWashOrderResourceResolver],
})
export class CarWashOrderResourceModule {}
