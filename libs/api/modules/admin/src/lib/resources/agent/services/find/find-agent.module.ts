import { Module } from '@nestjs/common';
import { AdminFindAgentService } from './find-agent.service';

@Module({
  providers: [AdminFindAgentService],
  exports: [AdminFindAgentService],
})
export class AdminFindAgentModule {}
