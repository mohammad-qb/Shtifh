import { Module } from '@nestjs/common';
import { CheckMissedNotificationsService } from './check-missed-notifications.service';

@Module({
  providers: [CheckMissedNotificationsService],
  exports: [CheckMissedNotificationsService],
})
export class CheckMissedNotificationsModule {}
