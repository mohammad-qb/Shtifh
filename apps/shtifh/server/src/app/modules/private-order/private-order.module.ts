import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { PrivateOrderController } from './private-order.controller';
import { PrivateOrderService } from './private-order.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PrivateOrderController],
  providers: [PrivateOrderController, PrivateOrderService],
  exports: [PrivateOrderController, PrivateOrderService],
})
export class PrivateOrderResourceModule {}
