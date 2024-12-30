import { Logger, UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AgentAvailabilityResourceService } from './availability-resource.service';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { JwtAuthGuard } from '@shtifh/auth-service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AgentAvailabilityResourceResolver {
  private logger = new Logger(AgentAvailabilityResourceResolver.name);

  constructor(
    private readonly agentAvailabilityResourceService: AgentAvailabilityResourceService
  ) {}

  @Mutation(() => Boolean, { name: 'agentSwitchAvailability' })
  async switchAvailability(
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.agentAvailabilityResourceService.switch(user.id, lang);
  }
}
