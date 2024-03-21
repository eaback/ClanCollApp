// Calendar.tsx
import React from 'react';

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const currentDay = currentDate.getDate();

  const renderCalendar = () => {
    const calendarDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const classNames = `inline-block text-center w-4 h-4 border border-transparent rounded-full ${
        i === currentDay ? 'bg-red-500' : ''
      }`;

      calendarDays.push(
        <div key={i} className={classNames}>
          <span className="text-primary">{i}</span>
          {i === currentDay && <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto mt-1"></div>}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="text-center mt-1 p-2 bg-secondary rounded-lg">
      <div className="text-xxs font-bold mb-0.5 text-primary">
        {currentMonth} {currentYear}
      </div>
      <div className="grid grid-cols-7 gap-1">
        <div className="text-xxs text-primary">Sun</div>
        <div className="text-xxs text-primary">Mon</div>
        <div className="text-xxs text-primary">Tue</div>
        <div className="text-xxs text-primary">Wed</div>
        <div className="text-xxs text-primary">Thu</div>
        <div className="text-xxs text-primary">Fri</div>
        <div className="text-xxs text-primary">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
