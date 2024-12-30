import { Module } from "@nestjs/common";
import { AgentSwitchAvailabilityService } from "./switch-availability.service";

@Module({
  providers: [AgentSwitchAvailabilityService],
  exports: [AgentSwitchAvailabilityService]
})
export class AgentSwitchAvailabilityModule {}
