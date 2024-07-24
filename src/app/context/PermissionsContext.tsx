// src/context/PermissionsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_APP_API_URL;

interface PermissionsContextProps {
  permissions: string[];
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
}

const PermissionsContext = createContext<PermissionsContextProps | undefined>(undefined);

export const usePermissions = (): PermissionsContextProps => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

interface PermissionsProviderProps {
  children: ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        
        const response = await axios.get(`${API_URL}/user-permissions`);
        setPermissions(response.data.map((permission: { name: string }) => permission.name));
      } catch (error) {
        console.error('Failed to fetch permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};
