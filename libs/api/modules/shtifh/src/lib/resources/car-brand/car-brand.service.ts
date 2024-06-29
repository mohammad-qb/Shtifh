import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CarBrandResourceService {
  private logger = new Logger(CarBrandResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    const results = await this.prismaService.carBrand.findMany({
      select: {
        id: true,
        image_url: true,
        name_ar: true,
        name_en: true,
        name_he: true,
      },
    });

    return results;
  }
}
