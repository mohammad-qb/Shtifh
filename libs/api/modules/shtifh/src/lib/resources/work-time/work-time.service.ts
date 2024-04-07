// work-time.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from '@shtifh/prisma-service';
import moment from 'moment';
import { ListAvailableSlotsDto } from './dto/list-available-slots.dto';

@Injectable()
export class WorkTimeService {
  private logger = new Logger(WorkTimeService.name);

  constructor(private prisma: PrismaService) {}

  async slots(args: ListAvailableSlotsDto): Promise<string[]> {
    const dayOfWeek = moment(args.date).format('dddd').toUpperCase();
    console.log({ dayOfWeek });
    const workTimes = await this.prisma.workTime.findMany({
      where: {
        cityId: args.cityId,
        day: dayOfWeek as $Enums.Day,
        is_day_off: false,
      },
    });

    let slots = [];

    for (const workTime of workTimes) {
      const startTime = moment(workTime.start_time, 'HH:mm');
      const endTime = moment(workTime.end_time, 'HH:mm');

      while (startTime.isBefore(endTime)) {
        const slotStart = startTime.format('HH:mm');
        const slotEnd = startTime.clone().add(1, 'hours').format('HH:mm');
        slots.push(`${slotStart} - ${slotEnd}`);
        startTime.add(1, 'hours');
      }
    }

    const formattedDate = moment(args.date).format('YYYY-MM-DD');
    const unavailableSlots = await this.prisma.unavailableSlot.findMany({
      where: {
        date: moment(formattedDate).toDate(),
      },
    });

    slots = slots.filter((slot) => {
      const [slotStart, slotEnd] = slot.split(' - ');
      return !unavailableSlots.some((unavailable) => {
        const unavailableStart = moment(
          `${formattedDate} ${unavailable.start_time}`,
          'YYYY-MM-DD HH:mm'
        );
        const unavailableEnd = moment(
          `${formattedDate} ${unavailable.end_time}`,
          'YYYY-MM-DD HH:mm'
        );
        return (
          moment(slotStart, 'HH:mm').isBefore(unavailableEnd) &&
          moment(slotEnd, 'HH:mm').isAfter(unavailableStart)
        );
      });
    });

    return slots;
  }
}
