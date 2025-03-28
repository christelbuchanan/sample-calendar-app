import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { MONTHS } from '../utils/dateUtils';
import { useCalendar } from '../context/CalendarContext';
import TimezoneSelector from './TimezoneSelector';
import UserSelector from './UserSelector';

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
  onAddEvent,
}) => {
  const { currentTimezone } = useCalendar();

  return (
    <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-center">
        <CalendarIcon className="mr-2 h-8 w-8 text-primary-500" />
        <h1 className="text-2xl font-bold text-gray-800">Family Calendar</h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex items-center">
          <button
            onClick={onPrevMonth}
            className="rounded-l-md border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="border-y border-gray-300 px-4 py-2 font-semibold">
            {MONTHS[currentMonth]} {currentYear}
          </div>
          <button
            onClick={onNextMonth}
            className="rounded-r-md border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <UserSelector />
        <TimezoneSelector />
        
        <button
          onClick={onAddEvent}
          className="btn btn-primary flex items-center"
        >
          <span className="mr-1 text-lg">+</span> Add Event
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
