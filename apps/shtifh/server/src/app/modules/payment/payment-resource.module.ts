import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { PaymentResourceController } from './payment-resource.controller';
import { PaymentResourceService } from './payment-resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentResourceController],
  providers: [PaymentResourceService, PaymentResourceController],
  exports: [PaymentResourceService, PaymentResourceController],
})
export class PaymentResourceModule {}
