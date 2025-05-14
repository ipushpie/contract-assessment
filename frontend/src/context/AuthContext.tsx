'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  AuthState, 
  getStoredAuthState, 
  storeAuthState, 
  clearAuthState, 
  loginUser, 
  registerUser 
} from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = { user: null, token: null, isAuthenticated: false };
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedState = getStoredAuthState();
    setAuthState(storedState);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      
      setAuthState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
      
      storeAuthState(data.user, data.token);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    try {
      setLoading(true);
      const data = await registerUser({ name, email, password, role });
      
      setAuthState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
      
      storeAuthState(data.user, data.token);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null, isAuthenticated: false });
    clearAuthState();
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
