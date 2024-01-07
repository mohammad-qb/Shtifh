import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { OrderResourceController } from './order-resource.controller';
import { OrderResourceService } from './order-resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderResourceController],
  providers: [OrderResourceController, OrderResourceService],
  exports: [OrderResourceController, OrderResourceService],
})
export class OrderResourceModule {}
