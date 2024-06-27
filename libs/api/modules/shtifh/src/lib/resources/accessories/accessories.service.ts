import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AccessoriesResourceService {
  private logger = new Logger(AccessoriesResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return await this.prismaService.accessories.findMany({
      select: {
        id: true,
        name_ar: true,
        name_en: true,
        name_he: true,
        image_url: true,
        price: true,
      },
    });
  }
}
