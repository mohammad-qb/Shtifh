import { Module } from '@nestjs/common';
import { NotificationValidatorService } from './notification-validator.service';

@Module({
  providers: [NotificationValidatorService],
  exports: [NotificationValidatorService],
})
export class NotificationValidatorModule {}
