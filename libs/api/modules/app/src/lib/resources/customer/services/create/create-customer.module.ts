import { Module } from "@nestjs/common";
import { CreateCustomerService } from "./create-customer.service";

@Module({
  providers: [CreateCustomerService],
  exports: [CreateCustomerService] 
})
export class CreateCustomerModule {}