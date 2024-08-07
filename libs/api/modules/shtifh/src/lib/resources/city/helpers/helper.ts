import { $Enums } from '@prisma/client';

export enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export function getDayOfWeek(date: Date): $Enums.Day {
  const dayIndex = date.getUTCDay();
  return Object.values(Day)[dayIndex];
}

export function addOneHour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const newHours = hours + 1;
  return `${newHours < 10 ? '0' : ''}${newHours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}
