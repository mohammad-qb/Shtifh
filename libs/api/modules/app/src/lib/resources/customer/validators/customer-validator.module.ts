import { Module } from '@nestjs/common';
import { CustomerValidatorService } from './customer-validator.service';

@Module({
  exports: [CustomerValidatorService],
  providers: [CustomerValidatorService],
})
export class CustomerValidatorModule {}
