import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExpressCarWashOrderResourceService } from './express-car-wash-order-resource.service';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { ListExpressCarWashOrdersEntity } from './entities/list-express-car-wash-orders.entity';
import { CancelExpressCarWashOrderInput } from './inputs/cancel-express-car-wash-order.input';
import { CreateExpressCarWashOrderInput } from './inputs/create-express-car-wash-order.input';
import { CreateExpressCarWashOrderEntity } from './entities/create-express-car-wash-order.entity';
import { ConfirmExpressCarWashOrderInput } from './inputs/confirm-express-car-wash-order.input';

@Resolver()
export class ExpressCarWashOrderResourceResolver {
  private logger = new Logger(ExpressCarWashOrderResourceResolver.name);

  constructor(
    private readonly expressCarWashOrderResourceService: ExpressCarWashOrderResourceService
  ) {}

  @Query(() => [ListExpressCarWashOrdersEntity], {
    name: 'listExpressCarWashOrders',
  })
  async listExpressCarWashOrders(@GqlUser() user: UserPayload) {
    return this.expressCarWashOrderResourceService.listExpressCarWashOrders(
      user.id
    );
  }

  @Mutation(() => Boolean, { name: 'cancelExpressCarWashOrder' })
  async cancelExpressCarWashOrder(
    @Args('CancelExpressCarWashOrderInput')
    input: CancelExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    await this.expressCarWashOrderResourceService.cancelExpressCarWashOrder(
      input.expressCarWashOrderId,
      user.id,
      lang
    );
    return true;
  }

  @Mutation(() => CreateExpressCarWashOrderEntity, {
    name: 'createExpressCarWashOrder',
  })
  async createExpressCarWashOrder(
    @Args('CreateExpressCarWashOrderInput')
    input: CreateExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    await this.expressCarWashOrderResourceService.createExpressCarWashOrder(
      user.id,
      input
    );
    return true;
  }

  @Mutation(() => Boolean, { name: 'confirmExpressCarWashOrder' })
  async confirmExpressCarWashOrder(
    @Args('ConfirmExpressCarWashOrderInput')
    input: ConfirmExpressCarWashOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() lang: HeaderLanguage
  ) {
    await this.expressCarWashOrderResourceService.confirmExpressCarWashOrder(
      user.id,
      input,
      lang
    );
    return true;
  }
}
