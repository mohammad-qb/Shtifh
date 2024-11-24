import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';

@Injectable()
export class MakeNotificationReadService {
  private logger = new Logger(MakeNotificationReadService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Marks a notification as read for a specific user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} notificationId - The ID of the notification to mark as read.
   * @param {HeaderLanguage} lang - The language preference for error messages.
   * @return {Promise<boolean>} - Returns true if the notification was successfully marked as read.
   */
  async makeNotificationRead(
    userId: string,
    notificationId: string,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `Make notification with Id ${notificationId} is read by user with Id ${userId}`
    );

    const notification = await this.prismaService.notification.findFirst({
      where: { id: notificationId },
      include: { read_receipts: true },
    });
    if (!notification)
      throw this.httpErrorsService.notificationNotFound(notificationId, lang);

    if (notification.read_receipts.some((receipt) => receipt.userId === userId))
      throw this.httpErrorsService.notificationAlreadyRead(
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
