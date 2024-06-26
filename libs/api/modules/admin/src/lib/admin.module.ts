import { Module } from '@nestjs/common';
import { AuthResourceModule } from './resources/auth/auth-resource.module';
import { CarModelResourceModule } from './resources/car-model/car-model-resource.module';
import { ServiceResourceModule } from './resources/service/service-resource.module';
import { CityResourceModule } from './resources/city/city-resource.module';
import { CustomerResourceModule } from './resources/customer/customer-resource.module';
import { EmployeeResourceModule } from './resources/employee/employee-resource.module';
import { OrderResourceModule } from './resources/orders/order-resource.module';
import { CarServiceResourceModule } from './resources/car-service/car-service-resource.module';
import { StatisticsResourceModule } from './resources/statistics/statistics.module';
import { NotificationResourceModule } from './resources/notification/notification.module';
import { PrivateOrderModule } from './resources/private-order/private-order.module';
import { PrivateServiceModule } from './resources/private-server/private-service.module';
import { CarModelServiceModule } from './resources/car-model-service/car-model-service.module';
import { ScheduleResourceModule } from './resources/schedule/schedule.module';

@Module({
  imports: [
    AuthResourceModule,
    CarModelResourceModule,
    CarServiceResourceModule,
    CityResourceModule,
    CustomerResourceModule,
    EmployeeResourceModule,
    OrderResourceModule,
    ServiceResourceModule,
    StatisticsResourceModule,
    NotificationResourceModule,
    PrivateOrderModule,
    PrivateServiceModule,
    CarModelServiceModule,
    ScheduleResourceModule,
  ],
  providers: [],
  exports: [],
})
export class AdminShtifhModule {}
