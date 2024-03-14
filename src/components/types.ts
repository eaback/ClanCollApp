export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
  export interface Group {
    id: string;
    name: string;
    members: string[]; // Array of user UIDs
    admin: string; // User UID of the admin
    // Other properties as needed
  }