import { Module } from '@nestjs/common';
import { UpdateCustomerService } from './update-customer.service';
import { CustomerValidatorModule } from '../../validators/customer-validator.module';

@Module({
  imports: [CustomerValidatorModule],
  providers: [UpdateCustomerService],
  exports: [UpdateCustomerService],
})
export class UpdateCustomerModule {}
