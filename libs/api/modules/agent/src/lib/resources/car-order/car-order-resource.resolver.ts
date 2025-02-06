import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarOrderResourceService } from './car-order-resource.service';
import { AgentCancelCarOrderInput } from './inputs/cancel-car-order.input';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { AgentGetCarOrderInput } from './inputs/get-car-order.input';
import { AgentListCarOrdersEntity } from './entities/list-car-orders.entity';
import { AgentCompleteCarOrderInput } from './inputs/complete-car-order.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AgentCarOrderResourceResolver {
  private logger = new Logger(AgentCarOrderResourceResolver.name);

  constructor(
    private readonly carOrderResourceService: CarOrderResourceService
  ) {}

  @Mutation(() => Boolean, { name: 'agentCancelCarOrder' })
  async cancel(
    @Args('AgentCancelCarOrderInput') input: AgentCancelCarOrderInput,
    @GqlLang() language: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.carOrderResourceService.cancel(user.id, input, language);
  }

  @Mutation(() => Boolean, { name: 'agentCompleteCarOrder' })
  async complete(
    @Args('AgentCompleteCarOrderInput') input: AgentCompleteCarOrderInput,
    @GqlLang() language: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.carOrderResourceService.complete(
      user.id,
      input.carOrderId,
      language
    );
  }

  @Query(() => [AgentListCarOrdersEntity], { name: 'agentListCarOrders' })
  async list(@GqlUser() user: UserPayload) {
    return await this.carOrderResourceService.list(user.id);
  }

  @Query(() => AgentListCarOrdersEntity, { name: 'agentGetCarOrder' })
  async getById(
    @Args('AgentGetCarOrderInput') input: AgentGetCarOrderInput,
    @GqlLang() language: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.carOrderResourceService.getById(
      user.id,
      input.carOrderId,
      language
    );
  }
}
