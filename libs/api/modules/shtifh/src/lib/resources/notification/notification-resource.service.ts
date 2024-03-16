import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class NotificationResourceService {
  private logger = new Logger(NotificationResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.notification;
  }

  async list(customerId: string) {
    const result = await this.model.findMany({
      where: { OR: [{ customerId }, { for_all: true }] },
      select: {
        content: true,
        content_ar: true,
        content_he: true,
        createdAt: true,
        id: true,
        type: true,
      },
    });

    return { result };
  }
}
