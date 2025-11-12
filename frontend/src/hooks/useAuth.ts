import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthResponse } from '../types/common';
import { setAuthData, clearAuthData, getStoredUser, isAuthenticated as checkIsAuthenticated } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount using API utilities
    try {
      const storedUser = getStoredUser();
      const isAuth = checkIsAuthenticated();
      
      if (storedUser && isAuth) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error loading stored user data:', error);
      clearAuthData();
    }
    setIsLoading(false);
  }, []);

  const login = (authResponse: AuthResponse) => {
    setAuthData(authResponse);
    setUser(authResponse.user);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };
};