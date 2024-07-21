import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateNotificationDto } from './dto/create.dto';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
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

    return { success: true };
  }

  async list() {
    return await this.model.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
