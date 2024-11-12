import { Module } from "@nestjs/common";
import { CarResourceResolver } from "./car-resource.resolver";
import { CarResourceService } from "./car-resource.service";
import { CreateCarModule } from "./services/create/create-car.module";
import { UpdateCarModule } from "./services/update/update-car.module";
import { ListCarsModule } from "./services/list/list-cars.module";
import { DeactivateCarModule } from "./services/deactivate/deactivate-car.module";

@Module({
  imports: [CreateCarModule, UpdateCarModule, ListCarsModule, DeactivateCarModule],
  providers: [CarResourceResolver, CarResourceService],
  exports: [CarResourceResolver]
})
export class CarResourceModule {}
