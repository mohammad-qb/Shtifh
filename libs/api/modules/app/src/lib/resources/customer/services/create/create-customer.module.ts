import { Module } from "@nestjs/common";
import { CreateCustomerService } from "./create-customer.service";
import {
  UserModule
} from '@shtifh/user-service';
import { CustomerValidatorModule } from '../../validators/customer-validator.module';

@Module({
  imports: [UserModule, CustomerValidatorModule],
  providers: [CreateCustomerService],
  exports: [CreateCustomerService]
})
export class CreateCustomerModule {}
