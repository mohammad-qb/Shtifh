import { Module } from '@nestjs/common';
import { CreateCustomerService } from './create-customer.service';
import { CustomerValidatorModule } from '../../validators/customer-validator.module';

@Module({
  imports: [CustomerValidatorModule],
  providers: [CreateCustomerService],
  exports: [CreateCustomerService],
})
export class CreateCustomerModule {}
