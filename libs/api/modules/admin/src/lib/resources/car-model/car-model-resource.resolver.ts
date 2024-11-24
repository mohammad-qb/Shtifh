import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCarModelResourceService } from './car-model-resource.service';

@Resolver()
export class AdminCarModelResourceResolver {
  private logger = new Logger(AdminCarModelResourceResolver.name);

  constructor(
    private readonly adminCarModelResourceService: AdminCarModelResourceService
  ) {}
}
