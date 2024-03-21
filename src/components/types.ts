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
    members: string[
      // {
      //   firstName: string,
      //   lastName: string,
      //   uid: string,

      // }
    ]; // Array of user UIDs
    admin: string; // User UID of the admin
    // Other properties as needed
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
