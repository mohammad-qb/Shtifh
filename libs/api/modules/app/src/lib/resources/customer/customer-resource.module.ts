import { Module } from "@nestjs/common";
import { CustomerResourceResolver } from "./customer-resource.resolver";
import { CustomerResourceService } from "./customer-resource.service";
import { CreateCustomerModule } from "./services/create/create-customer.module";
import { UpdateCustomerModule } from './services/update/update-customer.module';

@Module({
  imports: [CreateCustomerModule, UpdateCustomerModule],
  providers: [CustomerResourceResolver, CustomerResourceService],
  exports: [CustomerResourceResolver]
})
export class CustomerResourceModule {}
