import { Module } from "@nestjs/common";
import { ListPrivateServicesService } from "./list-private-services.service";

@Module({
  providers: [ListPrivateServicesService],
  exports: [ListPrivateServicesService],
})
export class ListPrivateServicesModule {}
