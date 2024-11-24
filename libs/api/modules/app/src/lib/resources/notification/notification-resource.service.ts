import { Injectable, Logger } from '@nestjs/common';
import { ListNotificationsService } from './services/list/list-notifications.service';
import { CheckMissedNotificationsService } from './services/check-missed/check-missed-notifications.service';
import { MakeNotificationReadService } from './services/make-read/make-notification-read.service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);

  constructor(
    private readonly listNotificationService: ListNotificationsService,
    private readonly checkMissedNotificationsService: CheckMissedNotificationsService,
    private readonly makeNotificationReadService: MakeNotificationReadService
  ) {}

  async list(userId: string) {
    return await this.listNotificationService.list(userId);
  }

  async checkMissedNotifications(userId: string) {
    return await this.checkMissedNotificationsService.checkMissedNotifications(
      userId
    );
  }

  async makeNotificationRead(
    userId: string,
    notificationId: string,
    lang: HeaderLanguage
  ) {
    return await this.makeNotificationReadService.makeNotificationRead(
      userId,
      notificationId,
      lang
    );
  }
}
