import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HeaderLang } from '@shtifh/decorators';
import { PrismaService } from '@shtifh/prisma-service';
import { ListSlotsDto } from './dto/slots.dto';
import { addOneHour, getDayOfWeek } from './helpers/helper';
import {
  addMonths,
  eachWeekOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from 'date-fns';

function formatDate(date: Date) {
  return format(new Date(date), 'yyyy-MM-dd');
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

    // console.log({
    //   bookedSlots,
    //   dailySchedule,
    //   recurringSchedule,
    //   globalSchedule,
    //   dayOfWeek,
    // });
    const slots: {
      content: string;
      value: string;
      requests_in_h: number;
    }[] = [];

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
    // Fetch existing weekend days and daily schedules
    const weekendDays = await this.prismaService.weekend.findMany({
      where: { cityId },
    });
    const dailySchedule = await this.prismaService.dailySchedule.findMany({
      where: { cityId, is_off: true },
    });

    // Create a set of day names from the weekend days
    const weekendDaysArray = Array.from(
      new Set(weekendDays.map((w) => w.day.toUpperCase()))
    );

    // Calculate the range for the next 6 months
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(addMonths(now, 6));

    // Generate all weekends within the range for each month
    const weekends = eachWeekOfInterval({ start, end }).flatMap(
      (startOfWeek) => {
        return weekendDaysArray.map((dayName) => {
          const dayOffset = (weekDays[dayName] - startOfWeek.getDay() + 7) % 7;
          const dayDate = new Date(startOfWeek);
          dayDate.setDate(startOfWeek.getDate() + dayOffset);
          // Set the time to midnight UTC
          dayDate.setUTCHours(0, 0, 0, 0);
          return dayDate.toISOString(); // Return in ISO string format
        });
      }
    );

    // Filter to ensure dates are within the 6-month range
    const validWeekends = weekends.filter(
      (date) => new Date(date) >= start && new Date(date) <= end
    );

    // Fetch daily schedules that are not off on valid weekend days
    const dailyScheduleOn = await this.prismaService.dailySchedule.findMany({
      where: {
        cityId,
        date: {
          in: validWeekends,
        },
      },
    });

    // Extract dates with is_off: false
    const nonOffDates = new Set(
      dailyScheduleOn.map((schedule) => schedule.date.toISOString())
    );

    // Create day off entries for each valid weekend day not present in dailyScheduleOn
    const dayOffSchedules = validWeekends
      .filter((date) => !nonOffDates.has(date))
      .map((date) => ({
        id: `weekend-${date}`, // Use ISO string as unique ID
        date,
        start_time: '00:00',
        end_time: '23:59',
        requests_in_hour: 0,
        is_off: true,
        cityId,
      }));

    // Combine existing daily schedules with generated day off schedules
    const allSchedules = [...dailySchedule, ...dayOffSchedules];

    // Sort combined schedules by date
    const sortedSchedules = allSchedules.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedSchedules;
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
