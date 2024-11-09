import { Module } from "@nestjs/common";
import { CityResourceResolver } from "./city-resource.resolver";
import { CityResourceService } from "./city-resource.service";
import { ListCitiesModule } from "./services/list/list-cities.module";

@Module({
  imports: [ListCitiesModule],
  providers: [CityResourceResolver, CityResourceService],
  exports: [CityResourceResolver]
})
export class CityResourceModule {}
