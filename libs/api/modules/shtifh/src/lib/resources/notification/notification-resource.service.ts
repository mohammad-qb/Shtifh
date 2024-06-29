import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.notification;
  }

  async list(customerId: string, lang: HeaderLang) {
    const result = await this.model.findMany({
      where: { OR: [{ customerId }, { for_all: true }] },
      select: {
        content_en: true,
        content_ar: true,
        content_he: true,
        createdAt: true,
        is_read: true,
        id: true,
        type: true,
      },
    });

    return {
      result: result.map((el) => {
        return {
          id: el.id,
          createdAt: el.createdAt,
          type: el.type,
          content: el[`content_${lang}`],
          isRead: el.is_read.some((e) => e === customerId),
        };
      }),
    };
  }

  async checkMissedNotification(customerId: string) {
    const notification = await this.prismaService.notification.findFirst({
      where: {
        customerId,
        NOT: {
          is_read: {
            hasSome: [customerId],
          },
        },
      },
    });

    return notification ? true : false;
  }

  async makeNotificationRead(customerId: string, notificationId: string) {
    const notification = await this.prismaService.notification.findFirst({
      where: { id: notificationId },
    });

    if (!notification) throw new BadRequestException('notification_not_exist');

    await this.prismaService.notification.update({
      where: { id: notificationId },
      data: { is_read: { push: customerId } },
    });

    return { success: true };
  }
}
