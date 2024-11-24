import { Module } from '@nestjs/common';
import { AdminCarResourceService } from './car-resource.service';
import { AdminCarResourceResolver } from './car-resource.resolver';

@Module({
  imports: [],
  providers: [AdminCarResourceService, AdminCarResourceResolver],
  exports: [AdminCarResourceResolver],
})
export class AdminCarResourceModule {}
