import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { OrderResourceController } from './order-resource.controller';
import { OrderResourceService } from './order-resource.service';
import { DateAccessModule } from '@shtifh/date-access-service';
import { FcmModule } from '@shtifh/fcm-service';
import { CityResourceModule } from '../city/city-resource.module';

@Module({
  imports: [PrismaModule, DateAccessModule, CityResourceModule, FcmModule],
  controllers: [OrderResourceController],
  providers: [OrderResourceController, OrderResourceService],
  exports: [OrderResourceController, OrderResourceService],
})
export class OrderResourceModule {}
