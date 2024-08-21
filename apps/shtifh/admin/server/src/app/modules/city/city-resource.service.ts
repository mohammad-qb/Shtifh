import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateCityDro } from './dto/create-city.dto';
import { UpdateCityDro } from './dto/update-city.dto';

@Injectable()
export class CityResourceService {
  private readonly logger = new Logger(CityResourceService.name);
  private readonly model = this.prismaService.city;

  constructor(private readonly prismaService: PrismaService) {}

  async create(args: CreateCityDro) {
    const city = await this.model.create({
      data: {
        ...args,
        GlobalSchedule: {
          create: {
            end_time: '22:00',
            start_time: '07:00',
            requests_in_hour: 2,
          },
        },
        RecurringDailySchedule: {
          create: {
            day: 'FRIDAY',
            start_time: '07:00',
            end_time: '03:00',
            requests_in_hour: 2,
            is_off: false,
          },
        },
        weekend: {
          createMany: {
            data: [
              {
                day: 'SATURDAY',
              },
            ],
          },
        },
      },
    });
    return { result: city };
  }

  async list() {
    const cities = await this.model.findMany({
      include: {
        car_services: {
          include: {
            car_model: {
              select: {
                name_he: true,
                id: true,
              },
            },
            car_model_services: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    return { result: cities };
  }

  async retrieve(cityId: string) {
    const city = await this.model.findFirst({ where: { id: cityId } });
    return { result: city };
  }

  async update(cityId: string, args: UpdateCityDro) {
    const city = await this.model.findFirst({ where: { id: cityId } });

    if (!city) throw new BadRequestException('City not exist');

    const result = await this.model.update({
      where: { id: cityId },
      data: args,
    });

    return { result };
  }
}
