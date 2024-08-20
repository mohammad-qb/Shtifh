import { Module } from '@nestjs/common';
import { AuthResourceModule } from './auth/auth-resource.module';
import { CityResourceModule } from './city/city-resource.module';
import { CustomerResourceModule } from './customer/customer-resource.module';
import { CarResourceModule } from './car/car-resource.module';
import { OrderResourceModule } from './orders/order-resource.module';
import { UserResourceModule } from './user/user-resource.module';
import { CarModelResourceModule } from './car-models/car-model-resource.module';
import { NotificationResourceModule } from './notification/notification-resource.module';
import { CarServiceResourceModule } from './car-service/car-service-resource.module';
import { PaymentResourceModule } from './payment/payment-resource.module';
import { EmployeeResourceModule } from './employee/employee.module';
import { PrivateServiceResourceModule } from './private-service/private-service.module';
import { PrivateOrderResourceModule } from './private-order/private-order.module';
import { CarBrandResourceModule } from './car-brand/car-brand.module';
import { AccessoriesResourceModule } from './accessories/accessories.module';
import { OrdersReminderModule } from '../tasks/orders/orders-reminder.module';

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
    CarBrandResourceModule,
    AccessoriesResourceModule,
    OrdersReminderModule,
  ],
})
export class ShtifhModule {}
