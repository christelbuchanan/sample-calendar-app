import React from 'react';
import { CalendarEvent } from '../types';
import { useCalendar } from '../context/CalendarContext';
import { formatTime, convertFromTimezone } from '../utils/dateUtils';

interface EventItemProps {
  event: CalendarEvent;
  onClick: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick }) => {
  const { currentTimezone, users } = useCalendar();
  
  // Convert event times to current timezone
  const startTime = convertFromTimezone(event.start, event.timezone, currentTimezone);
  
  // Find the user who created this event
  const creator = users.find(user => user.id === event.createdBy);
  
  return (
    <div 
      className="calendar-event"
      style={{ backgroundColor: event.color }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="flex items-center justify-between">
        <span className="truncate font-semibold">{event.title}</span>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span>{formatTime(startTime)}</span>
        {creator && <span>by {creator.name}</span>}
      </div>
    </div>
  );
};

export default EventItem;
