import { Module } from "@nestjs/common";
import { UpdateCarService } from "./update-car.service";

@Module({
  providers: [UpdateCarService],
  exports: [UpdateCarService]
})
export class UpdateCarModule {}