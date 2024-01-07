import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CustomerShtifhService } from './customer.service';
import { CustomerShtifhController } from './customer.controller';

@Module({
  imports: [PrismaModule],
  providers: [CustomerShtifhService, CustomerShtifhController],
  exports: [CustomerShtifhService, CustomerShtifhController],
})
export class CustomerShtifhModule {}
