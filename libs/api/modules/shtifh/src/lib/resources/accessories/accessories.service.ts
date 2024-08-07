import { Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class AccessoriesResourceService {
  private logger = new Logger(AccessoriesResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list(lang: HeaderLang) {
    const results = await this.prismaService.accessories.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name_ar: true,
        name_en: true,
        name_he: true,
        image_url: true,
        price: true,
      },
    });

    return results.map((el) => ({
      id: el.id,
      image_url: el.image_url,
      name: el[`name_${lang}`],
      price: el.price,
    }));
  }
}
