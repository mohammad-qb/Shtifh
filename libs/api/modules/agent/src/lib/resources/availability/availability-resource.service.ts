import { Injectable, Logger } from '@nestjs/common';
import { AgentSwitchAvailabilityService } from './services/switch-availability/switch-availability.service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class AgentAvailabilityResourceService {
  private logger = new Logger(AgentAvailabilityResourceService.name);

  constructor(
    private readonly switchAvailabilityService: AgentSwitchAvailabilityService
  ) {}

  async switch(agentId: string, lang: HeaderLanguage) {
    return await this.switchAvailabilityService.switchAvailability(
      agentId,
      lang
    );
  }
}
