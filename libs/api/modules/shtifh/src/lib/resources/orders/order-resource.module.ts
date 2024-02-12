import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { OrderResourceController } from './order-resource.controller';
import { OrderResourceService } from './order-resource.service';
import { DateAccessModule } from '@shtifh/date-access-service';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [PrismaModule, DateAccessModule, UserModule],
  controllers: [OrderResourceController],
  providers: [OrderResourceController, OrderResourceService],
  exports: [OrderResourceController, OrderResourceService],
})
export class OrderResourceModule {}
