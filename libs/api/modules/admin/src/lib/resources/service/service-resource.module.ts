import { Module } from '@nestjs/common';
import { AdminServiceResourceService } from './service-resource.service';
import { AdminServiceResourceResolver } from './service-resource.resolver';

@Module({
  imports: [],
  providers: [AdminServiceResourceService, AdminServiceResourceResolver],
  exports: [AdminServiceResourceResolver],
})
export class AdminServiceResourceModule {}
