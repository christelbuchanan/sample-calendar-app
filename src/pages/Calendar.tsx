import React, { useState } from 'react';
import CalendarHeader from '../components/CalendarHeader';
import CalendarGrid from '../components/CalendarGrid';
import EventModal from '../components/EventModal';
import EventDetails from '../components/EventDetails';
import { useCalendar } from '../context/CalendarContext';

const Calendar: React.FC = () => {
  const { events, selectedDate, setSelectedDate } = useCalendar();
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventModalOpen(true);
  };
  
  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    setIsEventDetailsOpen(true);
  };
  
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };
  
  const handleEditEvent = () => {
    setIsEventDetailsOpen(false);
    setIsEventModalOpen(true);
  };
  
  // Find the selected event
  const eventToView = selectedEvent ? events.find(e => e.id === selectedEvent) : undefined;
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onAddEvent={handleAddEvent}
      />
      
      <CalendarGrid
        currentMonth={currentMonth}
        currentYear={currentYear}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
      
      <EventModal
        event={eventToView}
        selectedDate={selectedDate}
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      />
      
      {eventToView && (
        <EventDetails
          event={eventToView}
          isOpen={isEventDetailsOpen}
          onClose={() => setIsEventDetailsOpen(false)}
          onEdit={handleEditEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
