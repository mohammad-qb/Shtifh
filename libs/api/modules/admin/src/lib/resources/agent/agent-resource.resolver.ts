import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminAgentResourceService } from './agent-resource.service';

@Resolver()
export class AdminAgentResourceResolver {
  private logger = new Logger(AdminAgentResourceResolver.name);

  constructor(
    private readonly adminAgentResourceService: AdminAgentResourceService
  ) {}
}
