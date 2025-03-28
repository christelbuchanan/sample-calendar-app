import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalendarEvent, User } from '../types';
import { MOCK_EVENTS, MOCK_USERS } from '../data/mockData';

interface CalendarContextType {
  events: CalendarEvent[];
  users: User[];
  currentUser: User;
  currentTimezone: string;
  selectedDate: Date;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  setCurrentUser: (user: User) => void;
  setCurrentTimezone: (timezone: string) => void;
  setSelectedDate: (date: Date) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [users] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [currentTimezone, setCurrentTimezone] = useState<string>(MOCK_USERS[0].timezone);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Load data from localStorage if available
  useEffect(() => {
    const savedEvents = localStorage.getItem('familyCalendarEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        // Convert string dates back to Date objects
        const eventsWithDates = parsedEvents.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(eventsWithDates);
      } catch (error) {
        console.error('Failed to parse saved events', error);
      }
    }

    const savedUser = localStorage.getItem('familyCalendarCurrentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setCurrentTimezone(user.timezone);
      } catch (error) {
        console.error('Failed to parse saved user', error);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('familyCalendarEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('familyCalendarCurrentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        users,
        currentUser,
        currentTimezone,
        selectedDate,
        addEvent,
        updateEvent,
        deleteEvent,
        setCurrentUser,
        setCurrentTimezone,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
