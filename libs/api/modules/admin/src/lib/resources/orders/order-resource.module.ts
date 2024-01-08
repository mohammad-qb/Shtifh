import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { OrderResourceController } from './order-resource.controller';
import { OrderResourceService } from './order-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [OrderResourceController],
  providers: [OrderResourceController, OrderResourceService],
  exports: [OrderResourceController, OrderResourceService],
})
export class OrderResourceModule {}
