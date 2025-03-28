import React from 'react';
import { CalendarEvent } from '../types';
import { useCalendar } from '../context/CalendarContext';
import { convertFromTimezone } from '../utils/dateUtils';
import EventItem from './EventItem';

interface CalendarDayProps {
  date: Date | null;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (eventId: string) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, events, onDayClick, onEventClick }) => {
  const { currentTimezone } = useCalendar();
  
  if (!date) {
    return <div className="calendar-day bg-gray-50"></div>;
  }
  
  const isToday = new Date().toDateString() === date.toDateString();
  
  // Filter events for this day
  const eventsForDay = events.filter(event => {
    const eventStart = convertFromTimezone(event.start, event.timezone, currentTimezone);
    return eventStart.getDate() === date.getDate();
  });
  
  // Sort events by start time
  eventsForDay.sort((a, b) => {
    const aStart = convertFromTimezone(a.start, a.timezone, currentTimezone);
    const bStart = convertFromTimezone(b.start, b.timezone, currentTimezone);
    return aStart.getTime() - bStart.getTime();
  });
  
  return (
    <div 
      className={`calendar-day ${isToday ? 'bg-primary-50 ring-2 ring-primary-500 ring-inset' : ''}`}
      onClick={() => onDayClick(date)}
    >
      <div className={`mb-1 text-right text-sm ${isToday ? 'font-bold text-primary-700' : ''}`}>
        {date.getDate()}
      </div>
      
      <div className="overflow-y-auto">
        {eventsForDay.map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            onClick={() => onEventClick(event.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
