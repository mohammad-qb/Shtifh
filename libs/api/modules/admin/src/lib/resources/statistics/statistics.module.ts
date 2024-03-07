import { Module } from '@nestjs/common';
import { StatisticsResourceController } from './statistics.controller';
import { StatisticsResourceService } from './statistics.service';

@Module({
  imports: [],
  controllers: [StatisticsResourceController],
  providers: [StatisticsResourceController, StatisticsResourceService],
})
export class StatisticsResourceModule {}
