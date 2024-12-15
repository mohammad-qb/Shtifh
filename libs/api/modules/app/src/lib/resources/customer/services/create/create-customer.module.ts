import { Module } from "@nestjs/common";
import { CreateCustomerService } from "./create-customer.service";
import {
  UserModule
} from '@shtifh/user-service';

@Module({
  imports: [UserModule],
  providers: [CreateCustomerService],
  exports: [CreateCustomerService]
})
export class CreateCustomerModule {}
