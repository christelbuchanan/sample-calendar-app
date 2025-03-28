import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import Calendar from './pages/Calendar';

function App() {
  return (
    <div className="font-nunito min-h-screen bg-gray-50">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default App;
