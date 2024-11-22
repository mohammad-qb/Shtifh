import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarWashOrderResourceService } from './car-wash-order-resource.service';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { ListCarWashOrdersEntity } from './entities/list-car-wash-order.entity';
import { CancelCarWashOrderInput } from './inputs/cancel-car-wash-order.input';

@Resolver()
export class CarWashOrderResourceResolver {
  private logger = new Logger(CarWashOrderResourceResolver.name);

  constructor(
    private readonly carWashOrderResourceService: CarWashOrderResourceService
  ) {}

  @Query(() => [ListCarWashOrdersEntity], { name: 'listCarWashOrders' })
  async listCarWashOrders(@GqlUser() user: UserPayload) {
    return await this.carWashOrderResourceService.list(user.id);
  }

  @Mutation(() => Boolean, { name: 'cancelCarWashOrder' })
  async cancelCarWashOrder(
    @Args('CancelCarWashOrderInput') input: CancelCarWashOrderInput,
    @GqlLang() language: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.carWashOrderResourceService.cancel(
      user.id,
      input.carWashOrderId,
      language
    );
  }
}
