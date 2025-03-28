import React from 'react';
import { DAYS_OF_WEEK, getFirstDayOfMonth, getDaysInMonth, convertFromTimezone } from '../utils/dateUtils';
import { useCalendar } from '../context/CalendarContext';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  currentMonth: number;
  currentYear: number;
  onDayClick: (date: Date) => void;
  onEventClick: (eventId: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  currentYear,
  onDayClick,
  onEventClick,
}) => {
  const { events, currentTimezone } = useCalendar();
  
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  // Create calendar days array
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(currentYear, currentMonth, day));
  }
  
  // Filter events for the current month and convert to current timezone
  const eventsForMonth = events.filter(event => {
    const eventDate = convertFromTimezone(event.start, event.timezone, currentTimezone);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="calendar-day-header border-b border-gray-200 bg-gray-50">
            <span className="hidden md:inline">{day}</span>
            <span className="md:hidden">{day.substring(0, 3)}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7">
        {days.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            events={eventsForMonth}
            onDayClick={onDayClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
