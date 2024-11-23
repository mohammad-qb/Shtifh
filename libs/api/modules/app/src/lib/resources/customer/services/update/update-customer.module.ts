import { Module } from '@nestjs/common';
import { UpdateCustomerService } from './update-customer.service';

@Module({
  providers: [UpdateCustomerService],
  exports: [UpdateCustomerService],
})
export class UpdateCustomerModule {}
