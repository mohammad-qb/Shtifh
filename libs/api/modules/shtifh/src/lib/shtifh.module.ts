import { Module } from '@nestjs/common';
import { AuthResourceModule } from './resources/auth/auth-resource.module';
import { CityResourceModule } from './resources/city/city-resource.module';
import { CustomerResourceModule } from './resources/customer/customer-resource.module';
import { CarResourceModule } from './resources/car/car-resource.module';
import { OrderResourceModule } from './resources/orders/order-resource.module';
import { UserResourceModule } from './resources/user/user-resource.module';

@Module({
  imports: [
    AuthResourceModule,
    CarResourceModule,
    CityResourceModule,
    CustomerResourceModule,
    OrderResourceModule,
    UserResourceModule,
  ],
  providers: [],
  exports: [],
})
export class ShtifhModule {}
