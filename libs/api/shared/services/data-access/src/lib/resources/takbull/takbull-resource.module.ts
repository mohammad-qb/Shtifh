import { Module } from '@nestjs/common';
import { EnvModule } from '@shtifh/env-service';
import { TakbullResourceService } from './takbull-resource.service';

@Module({
  imports: [EnvModule],
  providers: [TakbullResourceService],
  exports: [TakbullResourceService],
})
export class TakbullResourceModule {}
