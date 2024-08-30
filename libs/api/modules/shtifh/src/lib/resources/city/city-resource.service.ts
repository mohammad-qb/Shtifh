import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { ListSlotsDto } from './dto/slots.dto';
import { addOneHour, getDayOfWeek } from './helpers/helper';
import {
  eachWeekOfInterval,
  format,
} from 'date-fns';

function formatDate(date: Date) {
  return format(new Date(date), 'yyyy-MM-dd');
}

function generateDateArrayAndMonths() {
  const dates: { date: string; day: string }[] = [];
  const today = new Date();

  for (let i = 0; i <= 31; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });

    dates.push({ date: formattedDate, day: day.toUpperCase() });
  }

  return dates;
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

    const unavailableSlots = await this.prismaService.unavailableSlot.findMany({
      where: {
        date: formattedDate,
        cityId: args.cityId,
      },
    });

    const unavailableSlotsJson = new Map<string, boolean>();
    for (let index = 0; index < unavailableSlots.length; index++) {
      unavailableSlotsJson.set(`${unavailableSlots[index].start_time} - ${unavailableSlots[index].end_time}`, true);
    }

    const dayOfWeek = getDayOfWeek(new Date(args.date));
    const recurringSchedule =
      await this.prismaService.recurringDailySchedule.findFirst({
        where: { day: dayOfWeek, cityId: args.cityId },
      });

    const globalSchedule = await this.prismaService.globalSchedule.findFirst({
      where: { cityId: args.cityId },
    });

    const slots: {
      content: string;
      value: string;
      requests_in_h: number;
    }[] = [];

    const unavailableSlotsHours = unavailableSlots.map((e) => ({
      startTimeHour: parseInt(e.start_time.split(':')[0]),
      endTimeHour: parseInt(e.end_time.split(':')[0]),
    }));

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
        requests_in_h,
      };
      const timeSlots = bookedSlots.filter((e) => {
        return e.time === slot.content;
      });

      const matchWithSlotUnavailable = unavailableSlotsHours.find((el) => {
        const timeHourNumber = parseInt(currentTime.split(':')[0]);

        return (
          timeHourNumber >= el.startTimeHour && timeHourNumber < el.endTimeHour
        );
      });

      if (timeSlots.length < requests_in_h && !matchWithSlotUnavailable) {
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
    const dates = generateDateArrayAndMonths();

    // Fetch existing weekend days and daily schedules
    const weekendDays = await this.prismaService.weekend.findMany({
      where: { cityId },
    });

    const recurringSchedule =
      await this.prismaService.recurringDailySchedule.findMany({
        where: { cityId, is_off: true },
      });

    const dailySchedule = await this.prismaService.dailySchedule.findMany({
      where: {
        cityId,
        date: {
          gte: dates[0].date + 'T00:00:00.000Z',
          lte: dates[dates.length - 1].date + 'T23:59:59.999Z',
        },
      },
    });

    const result = dates.map((el) => {
      const date = dailySchedule.find(
        (e) => e.date.toISOString().split('T')[0] === el.date
      );
      if (date) {
        return date.is_off ? el.date : null;
      } else if (weekendDays.some((e) => e.day === el.day)) {
        return el.date;
      } else if (recurringSchedule.some((e) => e.day === el.day)) {
        return el.date;
      } else return null;
    });

    return result.filter((el) => el !== null && el !== undefined);
  }
}

// Helper to map day names to week day indices
const weekDays: { [key: string]: number } = {
  SATURDAY: 0,
  SUNDAY: 1,
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
};
