export interface User {
    uid: string;
    nickName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
  export interface Clan {
    id: string;
    name: string;
    members: string[    ]; 
    admin: string; // User UID of the admin
    
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
