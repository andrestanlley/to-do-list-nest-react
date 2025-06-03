import { DateTime } from 'luxon';

export function dateToTZ(date?: Date) {
  if (!date) return;
  const tz = 'America/Sao_Paulo';
  const originalDate = new Date(date);
  return DateTime.fromJSDate(originalDate).setZone(tz).toJSDate();
}
