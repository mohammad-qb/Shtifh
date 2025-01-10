import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import {Notification} from '@prisma/client';

@Injectable()
export class ListNotificationsService {
  private logger = new Logger(ListNotificationsService.name);

  constructor(private readonly prismaService: PrismaService) {}


  /**
   * Retrieves a list of notifications for a given user. Includes notifications specific to the user as well as global notifications.
   * @param {string} userId - The unique identifier of the user for whom to retrieve notifications.
   * @return {Promise<Array<Notification>>} A promise that resolves to an array of Notification objects.
   */
  async list(userId: string): Promise<Array<Notification>> {
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
