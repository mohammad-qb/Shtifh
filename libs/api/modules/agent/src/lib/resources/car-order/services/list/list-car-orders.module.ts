import { Module } from "@nestjs/common";
import { ListCarOrdersService } from "./list-car-orders.service";

@Module({
  providers: [ListCarOrdersService],
  exports: [ListCarOrdersService]
})
export class ListCarOrdersModule {}
