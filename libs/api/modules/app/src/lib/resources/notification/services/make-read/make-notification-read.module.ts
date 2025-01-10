import { Module } from '@nestjs/common';
import { MakeNotificationReadService } from './make-notification-read.service';
import { NotificationValidatorModule } from '../../validators/notification-validator.module';

@Module({
  imports: [NotificationValidatorModule],
  providers: [MakeNotificationReadService],
  exports: [MakeNotificationReadService],
})
export class MakeNotificationReadModule {}
