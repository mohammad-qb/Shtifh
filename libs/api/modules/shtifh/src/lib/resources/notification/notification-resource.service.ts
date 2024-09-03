import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { Payload } from '@shtifh/user-service';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.notification;
  }

  async list(user: Payload, lang: HeaderLang) {
    const result = await this.model.findMany({
      orderBy: { createdAt: 'desc' },
      where:
        user.role === 'CUSTOMER'
          ? { OR: [{ userId: user.userId }, { for_all: true }] }
          : { userId: user.userId },
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
          isRead: el.is_read.some((e) => e === user.id),
        };
      }),
    };
  }

  async checkMissedNotification(userId: string) {
    const notification = await this.prismaService.notification.findFirst({
      where: {
        is_read: {
          has: userId,
        },
      },
    });
    return !notification ? true : false;
  }

  async makeNotificationRead(userId: string, notificationId: string) {
    const notification = await this.prismaService.notification.findFirst({
      where: { id: notificationId },
    });

    if (!notification) throw new BadRequestException('notification_not_exist');

    await this.prismaService.notification.update({
      where: { id: notificationId },
      data: { is_read: { push: userId } },
    });

    return { success: true };
  }
}
