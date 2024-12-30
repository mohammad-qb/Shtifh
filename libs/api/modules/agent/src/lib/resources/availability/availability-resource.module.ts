import { Module } from '@nestjs/common';
import { AgentSwitchAvailabilityModule } from './services/switch-availability/switch-availability.module';
import { AgentAvailabilityResourceResolver } from './availability-resource.resolver';
import { AgentAvailabilityResourceService } from './availability-resource.service';

@Module({
  imports: [AgentSwitchAvailabilityModule],
  providers: [
    AgentAvailabilityResourceResolver,
    AgentAvailabilityResourceService,
  ],
  exports: [AgentAvailabilityResourceResolver],
})
export class AgentAvailabilityResourceModule {}
