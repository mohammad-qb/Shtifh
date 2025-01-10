import { Module } from "@nestjs/common";
import { CarValidatorService } from "./car-validator.service";

@Module({
  providers: [CarValidatorService],
  exports: [CarValidatorService]
})
export class CarValidatorModule {}
