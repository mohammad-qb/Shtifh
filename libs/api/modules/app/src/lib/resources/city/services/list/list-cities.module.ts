import { Module } from "@nestjs/common";
import { ListCitiesService } from "./list-cities.service";

@Module({
  providers: [ListCitiesService],
  exports: [ListCitiesService]
})
export class ListCitiesModule {}