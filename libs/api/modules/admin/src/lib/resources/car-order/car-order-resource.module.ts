import { Module } from '@nestjs/common';
import { AdminCarOrderResourceService } from './car-order-resource.service';
import { AdminCarOrderResourceResolver } from './car-order-resource.resolver';

@Module({
  imports: [],
  providers: [AdminCarOrderResourceService, AdminCarOrderResourceResolver],
  exports: [AdminCarOrderResourceResolver],
})
export class AdminCarOrderResourceModule {}
