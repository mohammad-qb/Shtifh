import { Module } from '@nestjs/common';
import { AuthResourceModule } from './auth/auth-resource.module';
import { CarModelResourceModule } from './car-model/car-model-resource.module';
import { ServiceResourceModule } from './service/service-resource.module';
import { CityResourceModule } from './city/city-resource.module';
import { CustomerResourceModule } from './customer/customer-resource.module';
import { EmployeeResourceModule } from './employee/employee-resource.module';
import { OrderResourceModule } from './orders/order-resource.module';
import { CarServiceResourceModule } from './car-service/car-service-resource.module';
import { StatisticsResourceModule } from './statistics/statistics.module';
import { NotificationResourceModule } from './notification/notification.module';
import { PrivateOrderModule } from './private-order/private-order.module';
import { PrivateServiceModule } from './private-server/private-service.module';
import { CarModelServiceModule } from './car-model-service/car-model-service.module';
import { ScheduleResourceModule } from './schedule/schedule.module';

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
