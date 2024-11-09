import { Module } from "@nestjs/common";
import { ListAccessoriesService } from "./list-accessories.service";

@Module({
  providers: [ListAccessoriesService],
  exports: [ListAccessoriesService]
})
export class ListAccessoriesModule {}