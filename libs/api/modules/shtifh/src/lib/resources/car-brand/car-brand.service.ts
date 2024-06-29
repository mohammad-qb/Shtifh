import { Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CarBrandResourceService {
  private logger = new Logger(CarBrandResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list(lang: HeaderLang) {
    const results = await this.prismaService.carBrand.findMany({
      select: {
        id: true,
        image_url: true,
        name_ar: true,
        name_en: true,
        name_he: true,
      },
    });

    return results.map((el) => {
      return {
        id: el.id,
        image_url: el.image_url,
        name: el[`name_${lang}`],
      };
    });
  }
}
