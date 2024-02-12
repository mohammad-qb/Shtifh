import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { ListSlotsDto } from './dto/slots.dto';

@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.city;
  }

  async list(lang?: HeaderLang) {
    return this.model.findMany({
      select: {
        id: true,
        name_ar: true,
        name_en: true,
        name_he: true,
        work_time: {
          select: {
            day: true,
            end_time: true,
            start_time: true,
            is_day_off: true,
          },
        },
        car_services: {
          select: {
            id: true,
            services: {
              select: {
                id: true,
                fees: true,
                service: {
                  select: {
                    id: true,
                    name_ar: true,
                    name_en: true,
                    name_he: true,
                  },
                },
              },
            },
            car_model: {
              select: {
                name_ar: true,
                name_en: true,
                name_he: true,
              },
            },
          },
        },
      },
    });
  }

  async slots(args: ListSlotsDto) {
    const city = await this.model.findFirst({ where: { id: args.cityId } });

    if (!city) throw new BadRequestException('city_not_exist');
    let startSlot = 8;
    const _slots = Array.from({ length: 10 }).map((el) => {
      const content = `${startSlot}:00 - ${startSlot + 1}:00`;
      const value = startSlot;
      startSlot += 1;
      return {
        content,
        value,
      };
    });
    return { result: _slots };
  }
}
