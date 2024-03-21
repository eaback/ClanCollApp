// DigitalClock.tsx
import React, { useState, useEffect } from 'react';
import { ClockTime } from '../types'; // Assuming you have a types.ts file with ClockTime type defined

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<ClockTime>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      setTime({
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
        seconds: currentDate.getSeconds()
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-secondary text-primary rounded-lg">
      <div className="text-center text-6xl font-bold">
        {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
      </div>
    </div>
  );
};

export default DigitalClock;
