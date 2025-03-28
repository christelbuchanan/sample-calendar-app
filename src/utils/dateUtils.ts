export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function convertToTimezone(date: Date, timezone: string): Date {
  const targetDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const diff = date.getTime() - targetDate.getTime();
  return new Date(date.getTime() + diff);
}

export function convertFromTimezone(date: Date, fromTimezone: string, toTimezone: string): Date {
  // First convert to UTC
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const fromDate = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }));
  const diff = utcDate.getTime() - fromDate.getTime();
  
  // Then convert to target timezone
  const utcTimestamp = date.getTime() + diff;
  const targetDate = new Date(new Date(utcTimestamp).toLocaleString('en-US', { timeZone: toTimezone }));
  const targetDiff = new Date(utcTimestamp).getTime() - targetDate.getTime();
  
  return new Date(utcTimestamp + targetDiff);
}

export function getTimezoneOffset(timezone: string): string {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const offset = (tzDate.getTime() - utcDate.getTime()) / 60000;
  
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);
  
  return `${offset >= 0 ? '+' : '-'}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
