import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CustomerResourceService } from './customer-resource.service';
import { CustomerResourceController } from './customer-resource.controller';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CustomerResourceController],
  providers: [CustomerResourceService, CustomerResourceController],
  exports: [CustomerResourceService, CustomerResourceController],
})
export class CustomerResourceModule {}
