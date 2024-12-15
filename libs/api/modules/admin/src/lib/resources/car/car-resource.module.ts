import { Module } from '@nestjs/common';
import { AdminCarResourceService } from './car-resource.service';
import { AdminCarResourceResolver } from './car-resource.resolver';
import {
  AdminListCarsModule
} from './services/list/list-cars.module';

@Module({
  imports: [AdminListCarsModule],
  providers: [AdminCarResourceService, AdminCarResourceResolver],
  exports: [AdminCarResourceResolver],
})
export class AdminCarResourceModule {}
