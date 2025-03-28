import React from 'react';
import { Clock } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { COMMON_TIMEZONES } from '../data/timezones';

const TimezoneSelector: React.FC = () => {
  const { currentTimezone, setCurrentTimezone } = useCalendar();

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTimezone(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Clock className="h-4 w-4 text-gray-500" />
        </div>
        <select
          value={currentTimezone}
          onChange={handleTimezoneChange}
          className="select pl-9"
        >
          {COMMON_TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label} ({tz.offset})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimezoneSelector;
