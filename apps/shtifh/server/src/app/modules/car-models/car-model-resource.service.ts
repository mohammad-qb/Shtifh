import { Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';

@Injectable()
export class CarModelResourceService {
  private logger = new Logger(CarModelResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.carModel;
  }

  async list(lang: HeaderLang) {
    const models = await this.model.findMany({
      select: {
        id: true,
        image_url: true,
        name_ar: true,
        name_en: true,
        name_he: true,
      },
    });

    const results = models.map((el) => {
      return {
        id: el.id,
        image_url: el.image_url,
        name: el[`name_${lang}`],
      };
    });

    return { results };
  }
}
