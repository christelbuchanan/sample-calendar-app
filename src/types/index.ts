export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color: string;
  createdBy: string;
  timezone: string;
}

export interface User {
  id: string;
  name: string;
  timezone: string;
  color: string;
}

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}
