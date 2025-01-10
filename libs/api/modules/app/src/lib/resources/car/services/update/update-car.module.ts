import { Module } from "@nestjs/common";
import { UpdateCarService } from "./update-car.service";
import { CarValidatorModule } from '../../validators/car-validator.module';

@Module({
  imports: [CarValidatorModule],
  providers: [UpdateCarService],
  exports: [UpdateCarService]
})
export class UpdateCarModule {}
