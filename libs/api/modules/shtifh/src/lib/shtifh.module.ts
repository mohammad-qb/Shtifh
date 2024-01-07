import { Module } from '@nestjs/common';
import { AuthShtifhModule } from './resources/auth/auth.module';
import { CityShtifhModule } from './resources/city/city.module';
import { CustomerShtifhModule } from './resources/customer/customer.module';

@Module({
  imports: [AuthShtifhModule, CityShtifhModule, CustomerShtifhModule],
  providers: [],
  exports: [],
})
export class ShtifhModule {}
