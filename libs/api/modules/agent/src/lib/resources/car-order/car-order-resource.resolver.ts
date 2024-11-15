import { Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { CarOrderResourceService } from './car-order-resource.service';

@Resolver()
export class CarOrderResourceResolver {
  private logger = new Logger(CarOrderResourceResolver.name);

  constructor(private readonly carOrderResourceService: CarOrderResourceService) {}
}
