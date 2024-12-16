import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarResourceService } from './car-resource.service';
import {
  Logger,
  UseGuards
} from '@nestjs/common';
import { CreateCarInput } from './dtos/create-car.dto';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { UpdateCarInput } from './dtos/update-car.dto';
import { ListCarsEntity } from './entities/list-cars.entity';
import { DeactivateCarInput } from './dtos/deactivate-car.dto';
import {
  JwtAuthGuard
} from '@shtifh/auth-service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CarResourceResolver {
  private logger = new Logger(CarResourceResolver.name);

  constructor(private readonly carResourceService: CarResourceService) {}

  @Mutation(() => Boolean, { name: 'createCar' })
  async createCar(
    @Args('CreateCarInput') input: CreateCarInput,
    @GqlUser() user: UserPayload
  ) {
    return await this.carResourceService.create(user.id, input);
  }

  @Mutation(() => Boolean, { name: 'deactivateCar' })
  async deactivate(
    @Args('DeactivateCarInput') input: DeactivateCarInput,
    @GqlUser() user: UserPayload,
    @GqlLang() language: HeaderLanguage
  ) {
    return await this.carResourceService.deactivate(
      user.id,
      input.carId,
      language
    );
  }

  @Mutation(() => Boolean, { name: 'updateCar' })
  async updateCar(
    @Args('updateCarInput') input: UpdateCarInput,
    @GqlLang() language: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.carResourceService.update(user.id, language, input);
  }

  @Query(() => [ListCarsEntity], { name: 'cars' })
  async listCars(@GqlUser() user: UserPayload) {
    return await this.carResourceService.list(user.id);
  }
}
