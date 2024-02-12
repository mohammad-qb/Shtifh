import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarDto } from './dto/create-car.dto';
import { HeaderLang } from '@shtifh/decorators';

@Injectable()
export class CarResourceService {
  private logger = new Logger(CarResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.car;
  }

  async create(customerId: string, args: CreateCarDto) {
    const car = await this.model.create({
      data: {
        ...args,
        customerId,
      },
    });

    return { car };
  }

  async list(customerId: string, lang: HeaderLang) {
    const cars = await this.model.findMany({
      where: { customerId },
      select: {
        id: true,
        color: true,
        plate: true,
        name: true,
        year: true,
        model: {
          select: {
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
      },
    });

    const results = cars.map((el) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { model, ..._car } = el;
      return { ..._car, model_name: el.model[`name_${lang}`] };
    });
    return { results };
  }
}
