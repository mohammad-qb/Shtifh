import { Module } from "@nestjs/common";
import { CarModelResourceResolver } from "./car-model-resource.resolver";
import { CarModelResourceService } from "./car-model-resource.service";
import { ListCarModelsModule } from "./services/list/list-car-models.module";

@Module({
  imports: [ListCarModelsModule],
  providers: [CarModelResourceResolver, CarModelResourceService],
  exports: [CarModelResourceResolver]
})
export class CarModelResourceModule {}
