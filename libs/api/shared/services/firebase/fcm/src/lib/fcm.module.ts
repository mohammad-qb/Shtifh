import { Module } from '@nestjs/common';
import { FCMService } from './fcm.service';
import { FCMConfigModule } from './config/fcm-config.module';

@Module({
  imports: [FCMConfigModule],
  providers: [FCMService],
  exports: [FCMService],
})
export class FcmModule {}
