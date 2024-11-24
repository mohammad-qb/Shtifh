import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class ListNotificationsService {
  private logger = new Logger(ListNotificationsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Retrieves a list of notifications for the specified user.
   *
   * @param {string} userId - The ID of the user for whom to list notifications.
   * @return {Promise<Array>} A promise that resolves to an array of notification objects.
   */
  async list(userId: string) {
    this.logger.log(`List notifications for user with Id ${userId}`);

    const notifications = await this.prismaService.notification.findMany({
      where: { OR: [{ userId }, { userId: null }] },
    });

    this.logger.log(
      `Found ${notifications.length} notifications for user with Id ${userId}`
    );
    return notifications;
  }
}
