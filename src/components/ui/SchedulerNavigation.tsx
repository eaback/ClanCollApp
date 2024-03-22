import React from 'react';

interface NavigationProps {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
}

const Navigation: React.FC<NavigationProps> = ({ selectedDate, onDateChange }) => {
  const handlePrevWeek = () => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    onDateChange(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    onDateChange(nextWeek);
  };

  return (
    <div className="flex justify-between w-full mb-4">
      <button onClick={handlePrevWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        Previous Week
      </button>
      <div>
        <p className="font-semibold">{selectedDate.toDateString()}</p>
      </div>
      <button onClick={handleNextWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next Week
      </button>
    </div>
  );
};

export default Navigation;
