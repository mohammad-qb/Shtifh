import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCarResourceService } from './car-resource.service';

@Resolver()
export class AdminCarResourceResolver {
  private logger = new Logger(AdminCarResourceResolver.name);

  constructor(
    private readonly adminCarResourceService: AdminCarResourceService
  ) {}
}
