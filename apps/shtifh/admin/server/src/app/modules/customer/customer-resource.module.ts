import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { CustomerResourceController } from './customer-resource.controller';
import { CustomerResourceService } from './customer-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CustomerResourceController],
  providers: [CustomerResourceController, CustomerResourceService],
  exports: [CustomerResourceController, CustomerResourceService],
})
export class CustomerResourceModule {}
