import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Role = 'Citizen' | 'Rescue Team' | 'Administrator';

interface SOSData {
  id: string;
  type: string;
  peopleCount: number;
  info: string;
  location: { lat: number; lng: number; name: string };
  status: 'Request Sent' | 'Rescue Team Notified' | 'In Progress' | 'Resolved';
  timestamp: string;
  priorityScore?: number;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  sosActive: boolean;
  setSosActive: (active: boolean) => void;
  activeSOS: SOSData | null;
  setActiveSOS: (sos: SOSData | null) => void;
  weather: { temp: number; condition: string; location: string } | null;
  alertsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('Citizen');
  const [sosActive, setSosActive] = useState(false);
  const [activeSOS, setActiveSOS] = useState<SOSData | null>(null);
  const [weather, setWeather] = useState<{ temp: number; condition: string; location: string } | null>({
    temp: 26,
    condition: 'Partly Cloudy',
    location: 'Ghaziabad'
  });
  const [alertsCount] = useState(12);

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (data.temp) {
          setWeather({
            temp: data.temp,
            condition: data.condition || 'Partly Cloudy',
            location: data.location || 'Ghaziabad'
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      sosActive,
      setSosActive,
      activeSOS,
      setActiveSOS,
      weather,
      alertsCount
    }}>
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
