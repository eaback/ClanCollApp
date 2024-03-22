import React from 'react';
import { Reminder } from '../types'; // Importing types from types.ts

interface ReminderProps {
  reminder: Reminder;
}

const ReminderComponent: React.FC<ReminderProps> = ({ reminder }) => {

    const formattedTime = reminder.time.toLocaleTimeString();

  return (
    <div className="bg-yellow-200 p-2 rounded mt-2">
      <p className="font-semibold">{reminder.title}</p>
      <p className="text-xs">Time: {formattedTime}</p>
    </div>
  );
};

export default ReminderComponent;
