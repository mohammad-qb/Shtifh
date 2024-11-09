import { Module } from "@nestjs/common";
import { ListCarModelsService } from "./list-car-models.service";

@Module({
  providers: [ListCarModelsService],
  exports: [ListCarModelsService],
})
export class ListCarModelsModule {}