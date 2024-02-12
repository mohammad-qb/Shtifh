import { Module } from '@nestjs/common';
import { AuthResourceModule } from './resources/auth/auth-resource.module';
import { CityResourceModule } from './resources/city/city-resource.module';
import { CustomerResourceModule } from './resources/customer/customer-resource.module';
import { CarResourceModule } from './resources/car/car-resource.module';
import { OrderResourceModule } from './resources/orders/order-resource.module';
import { UserResourceModule } from './resources/user/user-resource.module';
import { CarModelResourceModule } from './resources/car-models/car-model-resource.module';
import { NotificationResourceModule } from './resources/notification/notification-resource.module';
import { CarServiceResourceModule } from './resources/car-service/car-service-resource.module';

@Module({
  imports: [
    AuthResourceModule,
    CarResourceModule,
    CityResourceModule,
    CustomerResourceModule,
    CarModelResourceModule,
    OrderResourceModule,
    UserResourceModule,
    NotificationResourceModule,
    CarServiceResourceModule,
  ],
  providers: [],
  exports: [],
})
export class ShtifhModule {}
