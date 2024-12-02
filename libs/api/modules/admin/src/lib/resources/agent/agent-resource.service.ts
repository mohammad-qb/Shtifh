import { Injectable, Logger } from '@nestjs/common';
import { AdminCreateAgentService } from './services/create/create-agent.service';
import { AdminCreateAgentInput } from './inputs/create-agent.input';
import { AdminUpdateAgentInput } from './inputs/update-agent.input';
import { AdminUpdateAgentService } from './services/update/update-agent.service';
import { AdminListAgentsService } from './services/list/list-agents.service';
import { AdminFindAgentService } from './services/find/find-agent.service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class AdminAgentResourceService {
  private logger = new Logger(AdminAgentResourceService.name);

  constructor(
    private readonly adminCreateAgentService: AdminCreateAgentService,
    private readonly adminUpdateAgentService: AdminUpdateAgentService,
    private readonly adminListAgentService: AdminListAgentsService,
    private readonly adminFindAgentService: AdminFindAgentService
  ) {}

  async create(input: AdminCreateAgentInput) {
    await this.adminCreateAgentService.createAgent(input);
    return true;
  }

  async update(input: AdminUpdateAgentInput, lang: HeaderLanguage) {
    await this.adminUpdateAgentService.updateAgent(input, lang);
    return true;
  }

  async list() {
    return await this.adminListAgentService.listAgents();
  }

  async find(agentId: string, lang: HeaderLanguage) {
    return await this.adminFindAgentService.findAgent(agentId, lang);
  }
}
