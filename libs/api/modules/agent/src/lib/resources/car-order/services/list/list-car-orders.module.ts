import { Module } from '@nestjs/common';
import { AgentListCarOrdersService } from './list-car-orders.service';

@Module({
  providers: [AgentListCarOrdersService],
  exports: [AgentListCarOrdersService],
})
export class AgentListCarOrdersModule {}
