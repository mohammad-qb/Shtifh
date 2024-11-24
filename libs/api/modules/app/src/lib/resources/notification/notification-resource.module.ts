import { Module } from '@nestjs/common';
import { ListNotificationsModule } from './services/list/list-notifications.module';
import { CheckMissedNotificationsModule } from './services/check-missed/check-missed-notifications.module';
import { MakeNotificationReadModule } from './services/make-read/make-notification-read.module';
import { NotificationResourceService } from './notification-resource.service';
import { NotificationResourceResolver } from './notification-resource.resolver';

@Module({
  imports: [
    ListNotificationsModule,
    CheckMissedNotificationsModule,
    MakeNotificationReadModule,
  ],
  providers: [NotificationResourceService, NotificationResourceResolver],
  exports: [NotificationResourceResolver],
})
export class NotificationResourceModule {}
