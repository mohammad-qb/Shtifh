import { Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';

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
            employees_to_work: true,
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
}
