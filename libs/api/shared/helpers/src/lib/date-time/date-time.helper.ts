import dayjs from 'dayjs';

export const newDate = (data?: string | number | Date) => {
  return data ? dayjs(data) : dayjs();
}
