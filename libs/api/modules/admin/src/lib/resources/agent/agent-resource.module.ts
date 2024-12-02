import { Module } from '@nestjs/common';
import { AdminAgentResourceService } from './agent-resource.service';
import { AdminAgentResourceResolver } from './agent-resource.resolver';
import { AdminCreateAgentModule } from './services/create/create-agent.module';
import { AdminFindAgentModule } from './services/find/find-agent.module';
import { AdminListAgentsModule } from './services/list/list-agents.module';
import { AdminUpdateAgentModule } from './services/update/update-agent.module';

@Module({
  imports: [
    AdminCreateAgentModule,
    AdminFindAgentModule,
    AdminListAgentsModule,
    AdminUpdateAgentModule,
  ],
  providers: [AdminAgentResourceService, AdminAgentResourceResolver],
  exports: [AdminAgentResourceResolver],
})
export class AdminAgentResourceModule {}
