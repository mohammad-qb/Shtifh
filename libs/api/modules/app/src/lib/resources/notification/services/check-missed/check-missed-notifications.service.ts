import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CheckMissedNotificationsService {
  private logger = new Logger(CheckMissedNotificationsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Checks for missed notifications for a specific user by counting unread notifications.
   *
   * @param {string} userId - The ID of the user for whom to check missed notifications.
   * @return {Promise<boolean>} - A promise that resolves to true if there are missed unread notifications, false otherwise.
   */
  async checkMissedNotifications(userId: string): Promise<boolean> {
    this.logger.log(`Check missed notifications for user ${userId}`);

    const missedUnreadNotificationsCount =
      await this.prismaService.notification.count({
        where: {
          OR: [{ userId }, { userId: null }],
          read_receipts: {
            none: { userId },
          },
        },
      });

    this.logger.log(
      `Found ${missedUnreadNotificationsCount} missed unread notifications for user ${userId}`
    );
    return missedUnreadNotificationsCount > 0;
  }
}
