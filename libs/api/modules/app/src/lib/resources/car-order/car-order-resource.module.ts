import { Module } from '@nestjs/common';
import { CarOrderResourceResolver } from './car-order-resource.resolver';
import { CarOrderResourceService } from './car-order-resource.service';
import { GetCarOrderModule } from './services/get/get-car-order.module';
import { ListCarOrdersModule } from './services/list/list-car-orders.module';
import { CreateCarOrderModule } from './services/create/create-car-order.module';

@Module({
  imports: [CreateCarOrderModule, ListCarOrdersModule, GetCarOrderModule],
  providers: [CarOrderResourceResolver, CarOrderResourceService],
  exports: [CarOrderResourceResolver],
})
export class CarOrderResourceModule {}
