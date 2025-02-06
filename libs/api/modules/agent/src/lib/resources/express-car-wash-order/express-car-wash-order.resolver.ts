import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { AgentExpressCarWashOrderResourceService } from './express-car-wash-order.service';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { AgentAcceptExpressCarWashOrderInput } from './inputs/accept-express-car-wash-order.input';
import { AgentCompleteExpressCarWashOrderInput } from './inputs/complete-express-car-wash-order.input';
import { AgentCancelExpressCarWashOrderInput } from './inputs/cancel-express-car-wash-order.input';
import { AgentStartExpressCarWashOrderInput } from './inputs/start-express-car-wash-order.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AgentExpressCarWashOrderResourceResolver {
  private logger = new Logger(AgentExpressCarWashOrderResourceResolver.name);

  constructor(
    private readonly agentExpressCarWashOrderResourceService: AgentExpressCarWashOrderResourceService
  ) {}

  @Mutation(() => Boolean, { name: 'agentAcceptExpressCarWashOrder' })
  async accept(
    @Args('AgentAcceptExpressCarWashOrderInput')
    input: AgentAcceptExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.agentExpressCarWashOrderResourceService.accept(
      user.id,
      input.expressCarWashOrderId,
      lang
    );
  }

  @Mutation(() => Boolean, { name: 'agentCompleteExpressCarWashOrder' })
  async complete(
    @Args('AgentCompleteExpressCarWashOrderInput')
    input: AgentCompleteExpressCarWashOrderInput,
    @GqlUser() user: UserPayload
  ) {
    return await this.agentExpressCarWashOrderResourceService.complete(
      user.id,
      input.expressCarWashOrderId
    );
  }

  @Mutation(() => Boolean, { name: 'agentCancelExpressCarWashOrder' })
  async cancel(
    @Args('AgentCancelExpressCarWashOrderInput')
    input: AgentCancelExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.agentExpressCarWashOrderResourceService.cancel(
      user.id,
      input,
      lang
    );
  }

  @Mutation(() => Boolean, { name: 'agentStartExpressCarWashOrder' })
  async Start(
    @Args('AgentStartExpressCarWashOrderInput')
    input: AgentStartExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.agentExpressCarWashOrderResourceService.start(
      user.id,
      input.expressCarWashOrderId,
      lang
    );
  }
}
