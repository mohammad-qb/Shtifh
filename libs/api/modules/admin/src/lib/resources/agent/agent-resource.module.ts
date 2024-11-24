import { Module } from '@nestjs/common';
import { AdminAgentResourceService } from './agent-resource.service';
import { AdminAgentResourceResolver } from './agent-resource.resolver';

@Module({
  imports: [],
  providers: [AdminAgentResourceService, AdminAgentResourceResolver],
  exports: [AdminAgentResourceResolver],
})
export class AdminAgentResourceModule {}
