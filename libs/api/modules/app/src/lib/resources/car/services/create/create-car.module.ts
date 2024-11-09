import { Module } from "@nestjs/common";
import { CreateCarService } from "./create-car.service";

@Module({
  providers: [CreateCarService],
  exports: [CreateCarService]
})
export class CreateCarModule {}