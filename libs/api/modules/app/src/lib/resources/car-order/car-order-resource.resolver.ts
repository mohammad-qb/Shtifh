import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarOrderResourceService } from './car-order-resource.service';
import { Logger, UseGuards } from '@nestjs/common';
import { ListCarOrdersEntity } from './entities/list-car-orders.entity';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { GetCarOrderByIdInput } from './inputs/get-car-order-by-id.input';
import {
  CreateNormalCarOrderInput,
  CreatePrivateCarOrderInput,
} from './inputs/create-car-order.input';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { UpdateNormalCarOrderInput } from './inputs/update-car-order.input';
import { UpdateNormalCarOrderEntity } from './entities/update-car-order.entity';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CarOrderResourceResolver {
  private logger = new Logger(CarOrderResourceResolver.name);

  constructor(
    private readonly carOrderResourceService: CarOrderResourceService
  ) {}

  @Query(() => [ListCarOrdersEntity], { name: 'carOrders' })
  async listCarOrders(@GqlUser() user: UserPayload) {
    return await this.carOrderResourceService.list(user.id);
  }

  @Query(() => ListCarOrdersEntity, { name: 'carOrder' })
  async carOrder(
    @Args('GetCarOrderByIdInput') input: GetCarOrderByIdInput,
    @GqlUser() user: UserPayload,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.carOrderResourceService.getCarOrderById(
      user.id,
      input.carOrderId,
      language
    );
  }

  @Mutation(() => Boolean, { name: 'createPrivateCarOrder' })
  async createPrivateCarOrder(
    @Args('CreatePrivateCarOrderInput') input: CreatePrivateCarOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.carOrderResourceService.createPrivateOrder(
      user.id,
      language,
      input
    );
  }

  @Mutation(() => String, { name: 'createNormalCarOrder' })
  async createNormalCarOrder(
    @Args('CreateNormalCarOrderInput') input: CreateNormalCarOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.carOrderResourceService.createNormalOrder(
      user,
      language,
      input
    );
  }

  @Mutation(() => UpdateNormalCarOrderEntity, { name: 'updateNormalCarOrder' })
  async updateNormalCarOrder(
    @Args('UpdateNormalCarOrderInput') input: UpdateNormalCarOrderInput,
    @GqlUser() user: UserPayload,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.carOrderResourceService.updateNormalOrder(
      user.id,
      language,
      input
    );
  }
}
