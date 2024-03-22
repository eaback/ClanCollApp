import React from 'react';
import { Activity } from '../types'; // Importing types from types.ts

interface ActivityProps {
    activity: Activity;
}

const ActivityComponent: React.FC<ActivityProps> = ({ activity }) => {

    const formattedStartTime = activity.startTime.toLocaleTimeString();
    const formattedEndTime = activity.endTime.toLocaleTimeString();

    return (
    <div className="bg-gray-100 p-2 rounded mt-2">
        <p className="font-semibold">{activity.title}</p>
        <p className="text-sm">{activity.description}</p>
        <p className="text-xs">Time:  {formattedStartTime} - {formattedEndTime}</p>
    </div>
    );
};

export default ActivityComponent;
