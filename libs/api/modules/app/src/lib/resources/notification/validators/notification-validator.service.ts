import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class NotificationValidatorService {
  private readonly logger = new Logger(NotificationValidatorService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Validates the existence of a notification by its ID and retrieves it.
   *
   * @param {string} notificationId - The unique identifier of the notification to validate.
   * @param {HeaderLanguage} lang - The language header used for localization or additional processing.
   * @throws An error if the notification is not found.
   */
  async validateNotification(notificationId: string, lang: HeaderLanguage) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
      include: { read_receipts: true },
    });
    if (!notification) {
      throw this.httpErrorsService.notificationNotFound(notificationId, lang);
    }
    return notification;
  }

  /**
   * Validates if a notification has already been marked as read for a user.
   *
   * @param {Array<{ userId: string }>} readReceipts - The list of read receipts for a notification.
   * @param {string} userId - The ID of the user.
   * @param {string} notificationId - The ID of the notification being validated.
   * @param {HeaderLanguage} lang - Language preference for error messages.
   * @throws {Error} Throws an error if the notification is already read.
   */
  validateNotificationUnread(
    readReceipts: { userId: string }[],
    userId: string,
    notificationId: string,
    lang: HeaderLanguage
  ): void {
    if (readReceipts.some((receipt) => receipt.userId === userId)) {
      throw this.httpErrorsService.notificationAlreadyRead(
        notificationId,
        lang
      );
    }
  }
}
