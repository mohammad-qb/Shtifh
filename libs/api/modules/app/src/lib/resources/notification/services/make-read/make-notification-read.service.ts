import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { NotificationValidatorService } from '../../validators/notification-validator.service';

@Injectable()
export class MakeNotificationReadService {
  private logger = new Logger(MakeNotificationReadService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationValidatorService: NotificationValidatorService
  ) {}


  /**
   * Marks a specific notification as read for a given user.
   *
   * @param {string} userId - The unique identifier of the user who has read the notification.
   * @param {string} notificationId - The unique identifier of the notification to be marked as read.
   * @param {HeaderLanguage} lang - The language setting for error or validation messages.
   * @return {Promise<boolean>} A promise resolving to `true` to indicate the notification has been successfully marked as read.
   */
  async makeNotificationRead(
    userId: string,
    notificationId: string,
    lang: HeaderLanguage
  ): Promise<boolean> {
    this.logger.log(
      `Make notification with Id ${notificationId} is read by user with Id ${userId}`
    );

    const notification =
      await this.notificationValidatorService.validateNotification(
        notificationId,
        lang
      );

    this.notificationValidatorService.validateNotificationUnread(
      notification.read_receipts,
      userId,
      notificationId,
      lang
    );

    await this.prismaService.readReceipt.create({
      data: {
        notificationId,
        userId,
      },
    });

    this.logger.log(
      `Notification with Id ${notificationId} set as read for user with Id ${userId}`
    );
    return true;
  }
}
