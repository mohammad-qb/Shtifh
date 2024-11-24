import { Module } from '@nestjs/common';
import { AdminStatisticsResourceResolver } from './statistics-resource.resolver';
import { AdminStatisticsResourceService } from './statistics-resource.service';

@Module({
  imports: [],
  providers: [AdminStatisticsResourceService, AdminStatisticsResourceResolver],
  exports: [AdminStatisticsResourceResolver],
})
export class AdminStatisticsResourceModule {}
