import { Query, Resolver } from "@nestjs/graphql";
import { CityResourceService } from "./city-resource.service";
import { Logger } from "@nestjs/common";
import { ListCitiesEntity } from "./entities/list-cities.entity";

@Resolver()
export class CityResourceResolver {
  private logger = new Logger(CityResourceResolver.name);

  constructor(private readonly CityResourceService: CityResourceService) {}

  @Query(() => [ListCitiesEntity], { name: "cities" })
  async listCities() {
    return await this.CityResourceService.list();
  }
}
