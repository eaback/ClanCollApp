import React from 'react';
import { User } from '../types'; // Importing types from types.ts

interface UserTagProps {
  user: User;
}

const UserTag: React.FC<UserTagProps> = ({ user }) => {
  return (
    <div className="bg-blue-200 p-2 rounded mt-2">
      <p className="font-semibold">{user.nickName}</p>
      <p className="text-xs">{user.email}</p>
    </div>
  );
};

export default UserTag;
