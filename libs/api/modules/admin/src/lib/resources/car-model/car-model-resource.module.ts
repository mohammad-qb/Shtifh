import { Module } from '@nestjs/common';
import { AdminCarModelResourceService } from './car-model-resource.service';
import { AdminCarModelResourceResolver } from './car-model-resource.resolver';

@Module({
  imports: [],
  providers: [AdminCarModelResourceService, AdminCarModelResourceResolver],
  exports: [AdminCarModelResourceResolver],
})
export class AdminCarModelResourceModule {}
