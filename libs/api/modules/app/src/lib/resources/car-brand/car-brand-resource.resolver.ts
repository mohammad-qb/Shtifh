import { Query, Resolver } from "@nestjs/graphql";
import { CarBrandResourceService } from "./car-brand-resource.service";
import { Logger } from "@nestjs/common";
import { ListCarBrandsEntity } from "./entities/list-car-brands.entity";

@Resolver()
export class CarBrandResourceResolver {
  private logger = new Logger(CarBrandResourceResolver.name);

  constructor(private readonly carBrandResourceService: CarBrandResourceService) {}

  @Query(() => [ListCarBrandsEntity], { name: 'carBrands' })  
  async listCarBrands() {
    return await this.carBrandResourceService.list();
  }
}
