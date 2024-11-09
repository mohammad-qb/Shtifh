import { Module } from "@nestjs/common";
import { AccessoryResourceService } from "./accessory-resource.service";
import { AccessoryResourceResolver } from "./accessory-resource.resolver";
import { ListAccessoriesModule } from "./services/list-accessories/list-accessories.module";

@Module({
  imports: [ListAccessoriesModule],
  providers: [AccessoryResourceService, AccessoryResourceResolver],
  exports: [AccessoryResourceResolver]
})
export class AccessoryResourceModule {}
