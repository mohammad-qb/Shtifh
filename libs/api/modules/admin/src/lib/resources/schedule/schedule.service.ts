import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { RetrieveScheduleDto } from './dto/retrieve-schedule.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { CreateUnavailableSlot } from './dto/create-unavailable-slot.dto';
import { UpdateMonthDto } from './dto/update-month.dto';

function getMonthDateRange(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1); // month - 1 because JavaScript months are 0-indexed
  const endDate = new Date(year, month, 0); // Day 0 is the last day of the previous month
  endDate.setHours(23, 59, 59, 999); // Set to the end of the day
  return { startDate, endDate };
}

@Injectable()
export class ScheduleResourceService {
  private logger = new Logger(ScheduleResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async schedule(args: RetrieveScheduleDto) {
    const { startDate, endDate } = getMonthDateRange(args.year, args.month);

    const promises = [
      this.prismaService.globalSchedule.findFirst({
        where: { cityId: args.cityId },
      }),
      this.prismaService.monthlySchedule.findFirst({
        where: {
          cityId: args.cityId,
          month: args.month,
          year: args.year,
        },
      }),
      this.prismaService.dailySchedule.findMany({
        where: {
          cityId: args.cityId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      this.prismaService.unavailableSlot.findMany({
        where: {
          cityId: args.cityId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      this.prismaService.weekend.findMany({
        where: { cityId: args.cityId },
      }),
    ];

    const [schedule, monthlySchedule, dailySchedule, unavailableSlot, weekend] =
      await Promise.all(promises);

    return {
      schedule,
      monthlySchedule,
      dailySchedule,
      weekend,
      unavailableSlot,
    };
  }

  async updateMonth(args: UpdateMonthDto) {
    const { scheduleId, ...rest } = args;
    if (!scheduleId) {
      await this.prismaService.monthlySchedule.create({ data: rest });
    } else {
      await this.prismaService.monthlySchedule.update({
        where: { id: scheduleId },
        data: rest,
      });
    }

    return { success: true };
  }

  async updateDay(args: UpdateDayDto) {
    const { scheduleId, ...rest } = args;

    if (args.scheduleId) {
      await this.prismaService.dailySchedule.update({
        where: { id: scheduleId },
        data: rest,
      });
    } else {
      await this.prismaService.dailySchedule.create({ data: rest });
    }

    return { success: true };
  }

  async createUnavailableSlot(args: CreateUnavailableSlot) {
    const result = await this.prismaService.unavailableSlot.create({
      data: args,
    });
    return result;
  }

  async removeUnavailableSlot(id: string) {
    const slot = await this.prismaService.unavailableSlot.findFirst({
      where: { id },
    });

    if (!slot) throw new BadRequestException('No Slot');

    await this.prismaService.unavailableSlot.delete({ where: { id } });

    return { success: true };
  }
}
