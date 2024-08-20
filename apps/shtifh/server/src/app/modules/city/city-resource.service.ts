import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { ListSlotsDto } from './dto/slots.dto';
import { addOneHour, getDayOfWeek } from './helpers/helper';
import { format } from 'date-fns';

function formatDate(date: Date) {
  return format(new Date(date), 'dd/MM/yyyy');
}
@Injectable()
export class CityResourceService {
  private logger = new Logger(CityResourceService.name);
  private model;
  private carServiceModel;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.city;
    this.carServiceModel = prismaService.carService;
  }

  async list(lang: HeaderLang) {
    const results = await this.model.findMany({
      where: { active: true },
      select: {
        id: true,
        name_ar: true,
        name_en: true,
        name_he: true,
      },
    });

    return results.map((el) => ({
      id: el.id,
      name: el[`name_${lang}`],
    }));
  }

  async slots(args: ListSlotsDto) {
    const formattedDate = args.date + 'T00:00:00.000+00:00';
    const city = await this.model.findFirst({ where: { id: args.cityId } });

    if (!city) throw new BadRequestException('city_not_exist');

    const bookedSlots = await this.prismaService.bookedSlots.findMany({
      where: { date: formatDate(new Date(args.date)), cityId: args.cityId },
    });

    const dailySchedule = await this.prismaService.dailySchedule.findFirst({
      where: {
        date: formattedDate,
        cityId: args.cityId,
      },
    });

    const dayOfWeek = getDayOfWeek(new Date(args.date));
    const recurringSchedule =
      await this.prismaService.recurringDailySchedule.findFirst({
        where: { day: dayOfWeek, cityId: args.cityId },
      });

    const globalSchedule = await this.prismaService.globalSchedule.findFirst({
      where: { cityId: args.cityId },
    });

    console.log({
      bookedSlots,
      dailySchedule,
      recurringSchedule,
      globalSchedule,
      dayOfWeek,
    });
    const slots: { content: string; value: string }[] = [];

    let requests_in_h = globalSchedule ? globalSchedule.requests_in_hour : 0;

    if (dailySchedule?.is_off) return slots;
    if (recurringSchedule?.is_off) return slots;

    // Generate slots based on the schedules
    let startTime = globalSchedule ? globalSchedule.start_time : '07:00';
    let endTime = globalSchedule ? globalSchedule.end_time : '18:00';

    if (recurringSchedule) {
      startTime = recurringSchedule.start_time;
      endTime = recurringSchedule.end_time;
      requests_in_h = recurringSchedule.requests_in_hour;
    }

    if (dailySchedule) {
      startTime = dailySchedule.start_time;
      endTime = dailySchedule.end_time;
      requests_in_h = dailySchedule.requests_in_hour;
    }

    let currentTime = startTime;
    while (currentTime < endTime) {
      const nextTime = addOneHour(currentTime);
      const slot = {
        content: `${currentTime} - ${nextTime}`,
        value: `${currentTime} - ${nextTime}`,
      };

      const timeSlots = bookedSlots.filter((e) => {
        return e.time === slot.content;
      });

      if (timeSlots.length < requests_in_h) {
        slots.push(slot);
      }

      currentTime = nextTime;
    }

    return slots;
  }

  async carModels(cityId: string) {
    const result = await this.carServiceModel.findMany({
      where: { cityId },
      select: {
        car_model: {
          select: {
            name_ar: true,
            id: true,
            name_en: true,
            name_he: true,
          },
        },
      },
    });

    return { result };
  }

  async daysOff(cityId: string) {
    return await this.prismaService.dailySchedule.findMany({
      where: { cityId, is_off: true },
    });
  }
}
