import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCarBrandResourceService } from './car-brand-resource.service';

@Resolver()
export class AdminCarBrandResourceResolver {
  private logger = new Logger(AdminCarBrandResourceResolver.name);

  constructor(
    private readonly adminCarBrandResourceService: AdminCarBrandResourceService
  ) {}
}
