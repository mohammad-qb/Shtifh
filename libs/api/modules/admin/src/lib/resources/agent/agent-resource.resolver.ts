import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminAgentResourceService } from './agent-resource.service';
import { AdminCreateAgentInput } from './inputs/create-agent.input';
import {
  AdminUpdateAgentInput
} from './inputs/update-agent.input';
import {
  GqlLang,
  HeaderLanguage
} from '@shtifh/decorators';
import {
  AdminFindAgentInput
} from './inputs/find-agent.input';
import {
  AdminListAgentsEntity
} from './entities/list-agents.entity';

@Resolver()
export class AdminAgentResourceResolver {
  private logger = new Logger(AdminAgentResourceResolver.name);

  constructor(
    private readonly adminAgentResourceService: AdminAgentResourceService
  ) {}

  @Mutation(() => Boolean, { name: 'adminCreateAgent' })
  async adminCreateAgent(
    @Args('AdminCreateAgentInput') input: AdminCreateAgentInput
  ) {
    return await this.adminAgentResourceService.create(input);
  }

  @Mutation(() => Boolean, { name: 'adminUpdateAgent'})
  async adminUpdateAgent(
    @Args('AdminUpdateAgentInput') input: AdminUpdateAgentInput,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.adminAgentResourceService.update(input, language);
  }

  @Query(() => [AdminListAgentsEntity], { name: 'adminListAgents' })
  async adminListAgents() {
    return await this.adminAgentResourceService.list();
  }

  @Query(() => AdminListAgentsEntity, { name: 'adminFindAgent' })
  async adminFindAgent(
    @Args('adminFindAgentInput') input: AdminFindAgentInput,
    @GqlLang() language: HeaderLanguage){
    return await  this.adminAgentResourceService.find(input.agentId, language);
  }
}
