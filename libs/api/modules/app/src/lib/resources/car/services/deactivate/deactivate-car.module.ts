import { Module } from "@nestjs/common";
import { DeactivateCarService } from "./deactivate-car.service";

@Module({
  providers: [DeactivateCarService],
  exports: [DeactivateCarService],
})
export class DeactivateCarModule {}
