import { Injectable, Logger } from '@nestjs/common';
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
        content: true,
        content_ar: true,
        content_he: true,
        createdAt: true,
        id: true,
        type: true,
      },
    });

    return {
      result: result.map((el) => {
        const { content_ar, content_he, ...rest } = el;
        return {
          ...rest,
          content:
            lang === 'ar'
              ? content_ar
              : lang === 'en'
              ? rest.content
              : content_he,
        };
      }),
    };
  }
}
