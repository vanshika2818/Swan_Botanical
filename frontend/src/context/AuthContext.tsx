import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister } from '@/api/auth';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  register: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setToken(storedToken);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    setInitialized(true);
  }, []);

  const register = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiRegister(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    token,
    register,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
    error,
    initialized
  };

  return (
    <AuthContext.Provider value={value}>
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