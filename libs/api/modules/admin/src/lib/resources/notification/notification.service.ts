import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateNotificationDto, CreateSpecificNotificationDto } from './dto/create.dto';
import { FCMService } from '@shtifh/fcm-service';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;
  private userModel;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fcmService: FCMService
  ) {
    this.model = prismaService.notification;
    this.userModel = prismaService.user;
  }

  async create(args: CreateNotificationDto) {
    await this.model.create({
      data: {
        content_en: args.content_en,
        content_ar: args.content_ar,
        content_he: args.content_he,
        for_all: true,
      },
    });

    await this.fcmService.send({
      data: {},
      topic: 'public_notification',
      notification: {
        title: 'הודעה חדשה',
        body: args.content_he,
      },
    });

    return { success: true };
  }

  async createSpecificNotification(args: CreateSpecificNotificationDto) {
    const user = await this.userModel.findFirst({
      where: {
        id: args.user_id,
      },
    });

    await this.model.create({
      data: {
        content_en: args.content_en,
        content_ar: args.content_ar,
        content_he: args.content_he,
        for_all: false,
      },
    });

    await this.fcmService.send({
      data: {},
      // topic: `user-${args.user_id}`,
      topic: `user-66dd546aac57d541f15a80ff`,
      // topic: 'public_notifications',
      notification: {
        // title: 'הודעה חדשה',
        title: 'Shtifa101',
        body: user?.lang == 'EN' ? args.content_en : user?.lang == 'AR' ? args.content_ar : args.content_he,
      },
    });

    return { success: true };
  }

  async list() {
    return await this.model.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
