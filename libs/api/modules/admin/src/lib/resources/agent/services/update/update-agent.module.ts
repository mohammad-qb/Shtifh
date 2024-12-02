import { Module } from '@nestjs/common';
import { AdminUpdateAgentService } from './update-agent.service';

@Module({
  providers: [AdminUpdateAgentService],
  exports: [AdminUpdateAgentService],
})
export class AdminUpdateAgentModule {}
