import dayjs from 'dayjs';

export const newDate = (data?: string | number | Date) => {
  return data ? dayjs(data) : dayjs();
}

/**
 * Adds the given number of hours to the provided date.
 * @param date The date to which hours should be added.
 * @param hours The number of hours to add.
 * @returns The new date with the hours added.
 */
export function addHours(date: dayjs.Dayjs, hours: number): dayjs.Dayjs {
  return date.add(hours, 'hour');
}
