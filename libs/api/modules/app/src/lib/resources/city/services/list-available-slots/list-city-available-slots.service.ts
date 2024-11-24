import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { ListCityAvailableSlotsInput } from '../../inputs/list-city-available-slots.input';
import { addHours, newDate } from '@shtifh/helpers';

@Injectable()
export class ListCityAvailableSlotsService {
  private logger = new Logger(ListCityAvailableSlotsService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrorsService: HttpErrorsService
  ) {}

  /**
   * Lists available time slots for a given city on a specific date.
   *
   * @param {ListCityAvailableSlotsInput} data - The input data containing cityId and date.
   * @param {HeaderLanguage} lang - The language for error messages and logging.
   * @return {Promise<string[]>} - A promise that resolves to an array of available time slots.
   */
  async listAvailableSlots(
    data: ListCityAvailableSlotsInput,
    lang: HeaderLanguage
  ) {
    this.logger.log(
      `List available slots for city Id ${data.cityId} on date ${data.date}`
    );

    const city = await this.prismaService.city.findFirst({
      where: { id: data.cityId },
    });
    if (!city) throw this.httpErrorsService.cityNotFound(data.cityId, lang);

    const bookedSlots = await this.prismaService.bookedSlot.findMany({
      where: { id: data.cityId, date: data.date },
    });

    const citySchedule = city.schedule;
    const dayOfWeek = new Date(data.date).getDay();
    const dateYear = new Date(data.date).getFullYear();
    const dateMonth = new Date(data.date).getMonth();
    const slots: { content: string; value: string }[] = [];
    let requestsInHour = citySchedule.global.requests_in_hour || 0;
    const unavailableSlotsHours = [];

    const cityDailySchedule = citySchedule.daily.find(
      (d) => (d.date = data.date)
    );
    const cityRecurringSchedule = citySchedule.recurring.find(
      (d) => (d.day = dayOfWeek)
    );
    const cityGlobalSchedule = citySchedule.global;
    const cityMonthlySchedule = citySchedule.monthly.find(
      (d) => d.year === dateYear && d.month === dateMonth
    );

    if (cityDailySchedule?.is_off && cityRecurringSchedule?.is_off) {
      this.logger.log(
        `city with Id ${data.cityId} on date ${data.date} is not available`
      );
      return slots;
    }

    // Generate slots based on the schedules
    let startTime = cityGlobalSchedule
      ? cityGlobalSchedule.start_time
      : '07:00';
    let endTime = cityGlobalSchedule ? cityGlobalSchedule.end_time : '18:00';

    if (cityMonthlySchedule) {
      startTime = cityMonthlySchedule.start_time;
      endTime = cityMonthlySchedule.end_time;
      requestsInHour = cityMonthlySchedule.requests_in_hour;
    }

    if (cityRecurringSchedule) {
      startTime = cityRecurringSchedule.start_time;
      endTime = cityRecurringSchedule.end_time;
      requestsInHour = cityRecurringSchedule.requests_in_hour;
      cityRecurringSchedule.unavailable_slots.length &&
        unavailableSlotsHours.push(...cityRecurringSchedule.unavailable_slots);
    }

    if (cityDailySchedule) {
      startTime = cityDailySchedule.start_time;
      endTime = cityDailySchedule.end_time;
      requestsInHour = cityDailySchedule.requests_in_hour;
      cityDailySchedule.unavailable_slots.length &&
        unavailableSlotsHours.push(...cityDailySchedule.unavailable_slots);
    }

    let currentTime = startTime;
    while (currentTime < endTime) {
      const nextTime = addHours(newDate(data.date), 1);
      const slot = {
        content: `${currentTime} - ${nextTime}`,
        value: `${currentTime} - ${nextTime}`,
      };
      const timeSlots = bookedSlots.filter(
        (bookedSlot) => bookedSlot.time === slot.content
      );

      const matchWithSlotUnavailable = unavailableSlotsHours.find((el) => {
        const timeHourNumber = parseInt(currentTime.split(':')[0]);
        const startTimeHourNumber = parseInt(el.start_time.split(':')[0]);
        const endTimeHourNumber = parseInt(el.end_time.split(':')[0]);

        return (
          timeHourNumber >= startTimeHourNumber &&
          timeHourNumber < endTimeHourNumber
        );
      });

      if (timeSlots.length < requestsInHour && !matchWithSlotUnavailable) {
        slots.push(slot);
      }

      currentTime = nextTime;
    }

    this.logger.log(
      `List available ${slots.length} slots for city Id ${data.cityId} on date ${data.date}`
    );
    return slots.map(el => el.value);
  }
}
