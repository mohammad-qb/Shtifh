import { Module } from '@nestjs/common';
import { EnvModule } from '@shtifh/env-service';
import { HyPayResourceService } from './hypay-resource.service';

@Module({
  imports: [EnvModule],
  providers: [HyPayResourceService],
  exports: [HyPayResourceService],
})
export class HyPayResourceModule {}
