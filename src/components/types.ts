export interface User {
    uid: string;
    nickName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
  export interface Clan {
    
    admin: string; // User UID of the admin
    clanId: string;
    clanName: string;
    members: string[ ]; 
  }

  export interface Member {
    uid: string;
    nickName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
  
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startTime: Date; // Use appropriate Date type
  endTime: Date; // Use appropriate Date type
}

export interface Reminder {
  id: string;
  title: string;
  time: Date; // Use appropriate Date type
}

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}