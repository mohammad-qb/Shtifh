import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCarDto } from './dto/create-car.dto';
import { HeaderLang } from '@shtifh/decorators';
import { UpdateCarDto } from './dto/update-car.dto';

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
      where: { customerId, is_active: true },
      select: {
        id: true,
        color: true,
        plate: true,
        year: true,
        city: {
          select: {
            id: true,
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
        brand: {
          select: {
            id: true,
            image_url: true,
            name_ar: true,
            name_en: true,
            name_he: true,
          },
        },
        model: {
          select: {
            id: true,
            image_url: true,
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
      return {
        ..._car,
        city: { id: el.city.id, name: el.city[`name_${lang}`] },
        model: {
          image_url: model.image_url,
          name: el.model[`name_${lang}`],
          id: el.model.id,
        },
      };
    });
    return { results };
  }

  async update(customerId: string, args: UpdateCarDto) {
    const { carId, ...rest } = args;
    const car = await this.model.findFirst({
      where: { id: carId, customerId },
    });

    if (!car) throw new BadRequestException('car_not_exist');
    const result = await this.model.update({
      where: { id: carId, customerId },
      data: rest,
    });
    return { car: result };
  }

  async delete(customerId: string, carId: string) {
    const car = await this.model.findFirst({
      where: { customerId, id: carId },
    });

    if (!car) throw new BadRequestException('car_not_exist');

    await this.model.update({
      where: { id: carId },
      data: { is_active: false },
    });

    return { success: true };
  }
}
