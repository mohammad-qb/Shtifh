import { Module } from '@nestjs/common';
import { CarBrandResourceController } from './car-brand.controller';
import { CarBrandResourceService } from './car-brand.service';

@Module({
  controllers: [CarBrandResourceController],
  providers: [CarBrandResourceController, CarBrandResourceService],
  exports: [CarBrandResourceController, CarBrandResourceService],
})
export class CarBrandResourceModule {}
