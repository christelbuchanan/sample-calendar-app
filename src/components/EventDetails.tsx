import React from 'react';
import { X, Clock, Calendar, User as UserIcon } from 'lucide-react';
import { CalendarEvent } from '../types';
import { useCalendar } from '../context/CalendarContext';
import { formatDateTime, convertFromTimezone } from '../utils/dateUtils';
import { getTimezoneLabel } from '../data/timezones';

interface EventDetailsProps {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, isOpen, onClose, onEdit }) => {
  const { users, currentTimezone } = useCalendar();
  
  if (!isOpen) return null;
  
  // Convert event times to current timezone
  const startTime = convertFromTimezone(event.start, event.timezone, currentTimezone);
  const endTime = convertFromTimezone(event.end, event.timezone, currentTimezone);
  
  // Find the user who created this event
  const creator = users.find(user => user.id === event.createdBy);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="mr-3 h-4 w-4 rounded-full" 
              style={{ backgroundColor: event.color }}
            ></div>
            <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {event.description && (
          <div className="mb-4 rounded-md bg-gray-50 p-3 text-gray-700">
            {event.description}
          </div>
        )}
        
        <div className="mb-4 space-y-3">
          <div className="flex items-start">
            <Calendar className="mr-2 mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Start</div>
              <div>{formatDateTime(startTime)}</div>
              <div className="text-sm text-gray-500">
                {getTimezoneLabel(currentTimezone)}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="mr-2 mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">End</div>
              <div>{formatDateTime(endTime)}</div>
            </div>
          </div>
          
          {creator && (
            <div className="flex items-start">
              <UserIcon className="mr-2 mt-0.5 h-5 w-5 text-gray-500" />
              <div>
                <div className="font-medium">Created by</div>
                <div>{creator.name}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <Clock className="mr-2 mt-0.5 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Original Timezone</div>
              <div>{getTimezoneLabel(event.timezone)}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onEdit}
            className="btn btn-primary"
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
