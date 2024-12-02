import { Module } from '@nestjs/common';
import { AdminListAgentsService } from './list-agents.service';

@Module({
  providers: [AdminListAgentsService],
  exports: [AdminListAgentsService],
})
export class AdminListAgentsModule {}
