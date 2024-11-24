import { Module } from '@nestjs/common';
import { AdminCustomerResourceService } from './customer-resource.service';
import { AdminCustomerResourceResolver } from './customer-resource.resolver';

@Module({
  imports: [],
  providers: [AdminCustomerResourceService, AdminCustomerResourceResolver],
  exports: [AdminCustomerResourceResolver],
})
export class AdminCustomerResourceModule {}
