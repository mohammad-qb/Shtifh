import {Query, Resolver} from '@nestjs/graphql';
import { AccessoryResourceService } from './accessory-resource.service';
import { ListAccessoriesEntity } from './entities/list-accessories.entity';

@Resolver()
export class AccessoryResourceResolver {
  constructor(private readonly accessoryResourceService: AccessoryResourceService) {}

  @Query(() => [ListAccessoriesEntity], { name: 'accessories' })
  async listAccessories() {
    return await this.accessoryResourceService.list();
  }
}
