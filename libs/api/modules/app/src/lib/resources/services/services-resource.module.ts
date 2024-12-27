import { Module } from "@nestjs/common";
import { ListPrivateServicesModule } from "./services/list-private-services/list-private-services.module";
import { ServicesResourceResolver } from "./services-resource.resolver";
import { ServicesResourceService } from "./services-resource.service";

@Module({
  imports: [ListPrivateServicesModule],
  providers: [ServicesResourceResolver, ServicesResourceService],
  exports: [ServicesResourceResolver],
})
export class ServicesResourceModule {}
