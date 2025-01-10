import { Module } from "@nestjs/common";
import { DeactivateCarService } from "./deactivate-car.service";
import { CarValidatorModule } from "../../validators/car-validator.module";

@Module({
  imports: [CarValidatorModule],
  providers: [DeactivateCarService],
  exports: [DeactivateCarService],
})
export class DeactivateCarModule {}
