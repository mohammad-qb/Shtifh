import { Module } from "@nestjs/common";
import { ListCarsService } from "./list-cars.service";

@Module({
  providers: [ListCarsService],
  exports: [ListCarsService]
})
export class ListCarsModule {}