import { Module } from '@nestjs/common';
import {
  AdminCarBrandResourceService
} from './car-brand-resource.service';
import {
  AdminCarBrandResourceResolver
} from './car-brand-resource.resolver';

@Module({
  imports: [],
  providers: [AdminCarBrandResourceService, AdminCarBrandResourceResolver],
  exports: [AdminCarBrandResourceResolver],
})
export class AdminCarBrandResourceModule {}
