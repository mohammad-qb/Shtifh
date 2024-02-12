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
      where: { customerId },
      select: {
        content: true,
        createdAt: true,
        id: true,
        type: true,
      },
    });

    return { result };
  }
}
