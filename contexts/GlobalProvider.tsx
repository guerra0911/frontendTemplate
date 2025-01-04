import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/api';

interface User {
  id: number;
  username: string;
  email: string;
  theme_preference?: 'light' | 'dark';
  [key: string]: any;
}

interface GlobalContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkCurrentUser: () => Promise<void>;
}

// Create the context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Hook for accessing context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// GlobalProvider component
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the current user from the backend with refresh token logic
  const checkCurrentUser = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('authToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        // Not logged in
        setIsLogged(false);
        setUser(null);
        return;
      }

      // Set the stored access token for axios
      api.setAuthToken(accessToken);

      // Attempt to get current user
      const res = await api.get('/api/user/me/');
      setUser(res.data);
      setIsLogged(true);

    } catch (error: any) {
      // If token is invalid or expired, we might get a 401
      if (error.response?.status === 401) {
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (!refreshToken) {
            setIsLogged(false);
            setUser(null);
            return;
          }
          // Attempt refresh
          const refreshResponse = await api.post('/api/user/token/refresh/', { refresh: refreshToken });
          const newAccessToken = refreshResponse.data.access;

          // Save new token and retry
          await AsyncStorage.setItem('authToken', newAccessToken);
          api.setAuthToken(newAccessToken);

          const res = await api.get('/api/user/me/');
          setUser(res.data);
          setIsLogged(true);
        } catch (refreshError) {
          // Refresh also failed; user must log in again
          console.error('Refresh token error:', refreshError);
          setIsLogged(false);
          setUser(null);
        }
      } else {
        console.error('Error fetching user data:', error);
        setIsLogged(false);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        checkCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
