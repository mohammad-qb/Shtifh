import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateNotificationDto } from './dto/create.dto';
import { FCMService } from '@shtifh/fcm-service';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fcmService: FCMService
  ) {
    this.model = prismaService.notification;
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
      topic: 'public-notification',
      notification: {
        title: 'הודעה חדשה',
        body: args.content_he,
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
