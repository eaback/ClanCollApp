import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, db } from '../../Firebase/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


export interface ClanContextType {
  selectedClanId: string | null;
  selectedClanName: string | null;
  user: User | null;
  setSelectedClan: (clanId: string, clanName: string) => void;
}

const ClanContext = createContext<ClanContextType>({
  selectedClanId: null,
  selectedClanName: null,
  user: null,
  setSelectedClan: () => {},
});

export const useClanContext = () => useContext(ClanContext);

export const ClanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedClanId, setSelectedClanId] = useState<string | null>(null);
  const [selectedClanName, setSelectedClanName] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userProfileData = docSnap.data() as User;
          console.log("User Profile Data:", userProfileData); 
        setUser(userProfileData);
      } else {
        console.log("User profile data not found!");
       }
      }
    };

    fetchUserProfile();
  }, []);

  const setSelectedClan = (clanId: string, clanName: string) => {
    setSelectedClanId(clanId);
    setSelectedClanName(clanName);
  };

  return (
    <ClanContext.Provider value={{ selectedClanId, selectedClanName, user,  setSelectedClan }}>
      {children}
    </ClanContext.Provider>
  );
};
