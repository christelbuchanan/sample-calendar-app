import React from 'react';
import { User } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

const UserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useCalendar();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <User className="h-4 w-4 text-gray-500" />
        </div>
        <select
          value={currentUser.id}
          onChange={handleUserChange}
          className="select pl-9"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserSelector;
