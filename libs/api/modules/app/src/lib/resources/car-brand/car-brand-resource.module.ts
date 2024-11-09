import { Module } from '@nestjs/common';
import { CarBrandResourceResolver } from './car-brand-resource.resolver';
import { CarBrandResourceService } from './car-brand-resource.service';
import { ListCarBrandsModule } from './services/list/list-car-brands.module';

@Module({
  imports: [ListCarBrandsModule],
  providers: [CarBrandResourceResolver, CarBrandResourceService],
  exports: [CarBrandResourceResolver],
})
export class CarBrandResourceModule {}
