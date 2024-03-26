import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ClanContextType {
  selectedClanId: string | null;
  selectedClanName: string | null;
  setSelectedClan: (clanId: string, clanName: string) => void;
}

const ClanContext = createContext<ClanContextType>({
  selectedClanId: null,
  selectedClanName: null,
  setSelectedClan: () => {},
});

export const useClanContext = () => useContext(ClanContext);

export const ClanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedClanId, setSelectedClanId] = useState<string | null>(null);
  const [selectedClanName, setSelectedClanName] = useState<string | null>(null);

  const setSelectedClan = (clanId: string, clanName: string) => {
    setSelectedClanId(clanId);
    setSelectedClanName(clanName);
  };

  return (
    <ClanContext.Provider value={{ selectedClanId, selectedClanName, setSelectedClan }}>
      {children}
    </ClanContext.Provider>
  );
};
