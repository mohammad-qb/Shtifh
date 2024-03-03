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
import { PaymentResourceModule } from './resources/payment/payment-resource.module';
import { EmployeeResourceModule } from './resources/employee/employee.module';
import { PrivateServiceResourceModule } from './resources/private-service/private-service.module';
import { PrivateOrderResourceModule } from './resources/private-order/private-order.module';

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
    PrivateServiceResourceModule,
    PrivateOrderResourceModule,
    PaymentResourceModule,
    EmployeeResourceModule,
  ],
})
export class ShtifhModule {}
