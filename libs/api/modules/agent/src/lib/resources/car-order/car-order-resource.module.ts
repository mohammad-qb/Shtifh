import { Module } from "@nestjs/common";
import { CarOrderResourceResolver } from "./car-order-resource.resolver";
import { CarOrderResourceService } from "./car-order-resource.service";

@Module({
  imports: [],
  providers: [CarOrderResourceResolver, CarOrderResourceService],
  exports: [CarOrderResourceResolver],
})
export class CarOrderResourceModule {}
