import { Module } from '@nestjs/common';
import { FCMConfigService } from './fcm-config.service';

@Module({
  providers: [FCMConfigService],
  exports: [FCMConfigService],
})
export class FCMConfigModule {}
