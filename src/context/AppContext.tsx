import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'Citizen' | 'Emergency Responder' | 'Government Authority';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  sosActive: boolean;
  setSosActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('Citizen');
  const [sosActive, setSosActive] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, sosActive, setSosActive }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
