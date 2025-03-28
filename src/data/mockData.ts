import { CalendarEvent, User } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Mom', timezone: 'America/New_York', color: '#f97316' },
  { id: '2', name: 'Dad', timezone: 'America/Chicago', color: '#3b82f6' },
  { id: '3', name: 'Sister', timezone: 'Europe/London', color: '#ec4899' },
  { id: '4', name: 'Brother', timezone: 'Asia/Tokyo', color: '#10b981' },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Family Video Call',
    description: 'Weekly family catch-up',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 18, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 19, 0),
    color: '#3b82f6',
    createdBy: '1',
    timezone: 'America/New_York',
  },
  {
    id: '2',
    title: 'Mom\'s Birthday',
    description: 'Don\'t forget to call!',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 0, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 0, 0),
    color: '#f97316',
    createdBy: '2',
    timezone: 'America/Chicago',
  },
  {
    id: '3',
    title: 'Sister\'s Graduation',
    description: 'University ceremony',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 10, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 12, 0),
    color: '#ec4899',
    createdBy: '3',
    timezone: 'Europe/London',
  },
];
