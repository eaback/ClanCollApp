export interface User {
    uid: string;
    nickName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
  export interface Clan {
    
    admin: string; 
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
  startTime: Date;
  endTime: Date; 
}

export interface Reminder {
  id: string;
  title: string;
  time: Date; 
}

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ToDo {
  id: string;
  text: string;
  createdBy: string;
}

export interface JournalEntry {
  title: string;
  id: string;
  text: string;
  image?: string | null;
  createdBy: string;
  createdAt: Date; 
}