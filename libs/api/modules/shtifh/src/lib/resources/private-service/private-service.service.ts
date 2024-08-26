import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class PrivateServiceService {
  private logger = new Logger(PrivateServiceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.privateService;
  }

  async list() {
    return await this.model.findMany({
      where: { is_active: true },
      select: {
        id: true,
        image_url: true,
        name_ar: true,
        name_en: true,
        name_he: true,
        description_ar: true,
        description_en: true,
        description_he: true,
      },
    });
  }
}
