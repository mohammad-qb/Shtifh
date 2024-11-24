import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCarOrderResourceService } from './car-order-resource.service';

@Resolver()
export class AdminCarOrderResourceResolver {
  private logger = new Logger(AdminCarOrderResourceResolver.name);

  constructor(
    private readonly adminCarOrderResourceService: AdminCarOrderResourceService
  ) {}
}
