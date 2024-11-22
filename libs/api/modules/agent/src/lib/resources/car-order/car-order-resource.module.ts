import { Module } from '@nestjs/common';
import { CarOrderResourceResolver } from './car-order-resource.resolver';
import { CarOrderResourceService } from './car-order-resource.service';
import { ListCarOrdersModule } from './services/list/list-car-orders.module';
import { GetCarOrderModule } from './services/get-one/get-car-order.module';
import { CancelCarOrderModule } from './services/cancel/cancel-car-order.module';
import { CompleteCarOrderModule } from './services/complete/complete-car-order.module';

@Module({
  imports: [
    ListCarOrdersModule,
    GetCarOrderModule,
    CancelCarOrderModule,
    CompleteCarOrderModule,
  ],
  providers: [CarOrderResourceResolver, CarOrderResourceService],
  exports: [CarOrderResourceResolver],
})
export class CarOrderResourceModule {}
