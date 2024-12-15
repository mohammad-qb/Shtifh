import { Resolver, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminCarResourceService } from './car-resource.service';
import { AdminListCarsEntity } from './entities/list-cars.entity';

@Resolver()
export class AdminCarResourceResolver {
  private logger = new Logger(AdminCarResourceResolver.name);

  constructor(
    private readonly adminCarResourceService: AdminCarResourceService
  ) {}

  @Query(() => [AdminListCarsEntity], { name: 'adminListCars' })
  async list() {
    return await this.adminCarResourceService.list();
  }
}
