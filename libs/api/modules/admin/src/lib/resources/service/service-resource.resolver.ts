import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminServiceResourceService } from './service-resource.service';

@Resolver()
export class AdminServiceResourceResolver {
  private logger = new Logger(AdminServiceResourceResolver.name);

  constructor(
    private readonly adminServiceResourceService: AdminServiceResourceService
  ) {}
}
