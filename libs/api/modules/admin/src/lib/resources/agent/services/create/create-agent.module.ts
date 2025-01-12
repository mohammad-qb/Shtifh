import { Module } from '@nestjs/common';
import { AdminCreateAgentService } from './create-agent.service';

@Module({
  providers: [AdminCreateAgentService],
  exports: [AdminCreateAgentService],
})
export class AdminCreateAgentModule {}
