"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAdminStatus: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock database users for demonstration
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', isAdmin: true },
  { id: '2', name: 'Regular User', email: 'user@example.com', password: 'user123', isAdmin: false },
  { id: '3', name: 'John Doe', email: 'john@example.com', password: 'john123', isAdmin: false },
  { id: '4', name: 'Jane Smith', email: 'jane@example.com', password: 'jane123', isAdmin: false },
  { id: '5', name: 'Alex Johnson', email: 'alex@example.com', password: 'alex123', isAdmin: false },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Usando o router do Next.js

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulating authentication API call
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
        toast.success('Login successful');
        router.push('/dashboard'); // Usando router.push do Next.js
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    toast.info('Logged out successfully');
    router.push('/login'); // Usando router.push do Next.js
  };

  const checkAdminStatus = () => {
    return user?.isAdmin || false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAdminStatus }}>
      {children}
    </AuthContext.Provider>
  );
};