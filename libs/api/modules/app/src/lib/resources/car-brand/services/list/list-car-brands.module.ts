import { Module } from "@nestjs/common";
import { ListCarBrandsService } from "./list-car-brands.service";

@Module({
  providers: [ListCarBrandsService],
  exports: [ListCarBrandsService]
})
export class ListCarBrandsModule {}