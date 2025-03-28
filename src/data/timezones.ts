import { TimezoneOption } from '../types';
import { getTimezoneOffset } from '../utils/dateUtils';

export const COMMON_TIMEZONES: TimezoneOption[] = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: getTimezoneOffset('America/Los_Angeles') },
  { value: 'America/Denver', label: 'Mountain Time (MT)', offset: getTimezoneOffset('America/Denver') },
  { value: 'America/Chicago', label: 'Central Time (CT)', offset: getTimezoneOffset('America/Chicago') },
  { value: 'America/New_York', label: 'Eastern Time (ET)', offset: getTimezoneOffset('America/New_York') },
  { value: 'Europe/London', label: 'London (GMT)', offset: getTimezoneOffset('Europe/London') },
  { value: 'Europe/Paris', label: 'Paris (CET)', offset: getTimezoneOffset('Europe/Paris') },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: getTimezoneOffset('Asia/Tokyo') },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', offset: getTimezoneOffset('Australia/Sydney') },
];

export function getTimezoneLabel(timezone: string): string {
  const tz = COMMON_TIMEZONES.find(t => t.value === timezone);
  return tz ? `${tz.label} (${tz.offset})` : timezone;
}
