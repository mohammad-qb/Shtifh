import { Module } from '@nestjs/common';
import { UserModule } from '@shtifh/user-service';
import { AdminCreateAgentService } from './create-agent.service';

@Module({
  imports: [UserModule],
  providers: [AdminCreateAgentService],
  exports: [AdminCreateAgentService],
})
export class AdminCreateAgentModule {}
