import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCustomerResourceService } from './customer-resource.service';

@Resolver()
export class AdminCustomerResourceResolver {
  private logger = new Logger(AdminCustomerResourceResolver.name);

  constructor(
    private readonly adminCustomerResourceService: AdminCustomerResourceService
  ) {}
}
