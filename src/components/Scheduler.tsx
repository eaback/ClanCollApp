// import React, { useState } from 'react';
// import { User, Clan, ClockTime } from './types'; // Importing types from types.ts
// import Activity from '../components/ui/ActivityComponent';
// import UserTag from '../components/ui/UserTag';
// import Reminder from '../components/ui/Reminder';
// import Navigation from '../components/ui/SchedulerNavigation';

// interface SchedulerProps {
//     currentUser: User;
//     clan: Clan;
// }

// const Scheduler: React.FC<SchedulerProps> = ({ currentUser, clan }) => {
//     const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   // Mock data for activities and reminders
//     const activities = []; // Populate with actual activities
//     const reminders = []; // Populate with actual reminders

//     const handleDateChange = (newDate: Date) => {
//     setSelectedDate(newDate);
//     };

//     return (
//     <div className="flex flex-col justify-center items-center">
//         <h1 className="text-3xl font-semibold mb-4">Scheduler</h1>
//         <Navigation selectedDate={selectedDate} onDateChange={handleDateChange} />
//         <div className="grid grid-cols-7 gap-2">
//         {/* Render days of the week */}
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="border border-gray-300 p-2 text-center">
//             <p className="text-sm font-semibold">{day}</p>
//             {/* Render activities for the day */}
//             {activities
//                 .filter(activity => new Date(activity.startTime).getDay() === new Date(selectedDate).getDay())
//                 .map(activity => (
//                 <Activity key={activity.id} activity={activity} />
//                 ))}
//             {/* Render reminders for the day */}
//             {reminders
//                 .filter(reminder => new Date(reminder.time).getDay() === new Date(selectedDate).getDay())
//                 .map(reminder => (
//                 <Reminder key={reminder.id} reminder={reminder} />
//                 ))}
//             </div>
//         ))}
//         </div>
//       {/* Display user tag and create activity form */}
//         <UserTag currentUser={currentUser} />
//       {/* Activity creation form */}
//       {/* Reminder creation form */}
//     </div>
//     );
// };

// export default Scheduler;
