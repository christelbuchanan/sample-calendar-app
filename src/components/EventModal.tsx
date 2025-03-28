import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CalendarEvent } from '../types';
import { useCalendar } from '../context/CalendarContext';
import { formatDate, formatTime } from '../utils/dateUtils';
import { COMMON_TIMEZONES } from '../data/timezones';

interface EventModalProps {
  event?: CalendarEvent;
  selectedDate?: Date;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, selectedDate, isOpen, onClose }) => {
  const { addEvent, updateEvent, deleteEvent, currentUser, currentTimezone } = useCalendar();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [color, setColor] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      if (event) {
        // Edit mode
        setTitle(event.title);
        setDescription(event.description || '');
        setStartDate(formatDate(event.start));
        setStartTime(formatTime(event.start));
        setEndDate(formatDate(event.end));
        setEndTime(formatTime(event.end));
        setTimezone(event.timezone);
        setColor(event.color);
      } else {
        // Create mode
        const date = selectedDate || new Date();
        const hour = date.getHours();
        const nextHour = (hour + 1) % 24;
        
        setTitle('');
        setDescription('');
        setStartDate(formatDate(date));
        setStartTime(`${String(hour).padStart(2, '0')}:00`);
        setEndDate(formatDate(date));
        setEndTime(`${String(nextHour).padStart(2, '0')}:00`);
        setTimezone(currentTimezone);
        setColor(currentUser.color);
      }
    }
  }, [isOpen, event, selectedDate, currentUser, currentTimezone]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    if (event) {
      // Update existing event
      updateEvent({
        ...event,
        title,
        description,
        start: startDateTime,
        end: endDateTime,
        color,
        timezone,
      });
    } else {
      // Create new event
      addEvent({
        title,
        description,
        start: startDateTime,
        end: endDateTime,
        color,
        createdBy: currentUser.id,
        timezone,
      });
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-1 block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="mb-1 block font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              rows={3}
            />
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="mb-1 block font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="startTime" className="mb-1 block font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="mb-1 block font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="endTime" className="mb-1 block font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="timezone" className="mb-1 block font-medium text-gray-700">
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="select"
              required
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label} ({tz.offset})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="color" className="mb-1 block font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-md border border-gray-300"
            />
          </div>
          
          <div className="flex justify-between">
            {event ? (
              <button
                type="button"
                onClick={handleDelete}
                className="btn bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            ) : (
              <div></div>
            )}
            
            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {event ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
