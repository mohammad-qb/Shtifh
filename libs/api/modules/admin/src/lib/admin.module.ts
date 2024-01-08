import { Module } from '@nestjs/common';
import { AuthResourceModule } from './resources/auth/auth-resource.module';
import { CarModelResourceModule } from './resources/car-model/car-model-resource.module';
import { ServiceResourceModule } from './resources/service/service-resource.module';
import { CityResourceModule } from './resources/city/city-resource.module';
import { CustomerResourceModule } from './resources/customer/customer-resource.module';
import { EmployeeResourceModule } from './resources/employee/employee-resource.module';
import { OrderResourceModule } from './resources/orders/order-resource.module';

@Module({
  imports: [
    AuthResourceModule,
    CarModelResourceModule,
    CityResourceModule,
    CustomerResourceModule,
    EmployeeResourceModule,
    OrderResourceModule,
    ServiceResourceModule,
  ],
  providers: [],
  exports: [],
})
export class AdminShtifhModule {}
