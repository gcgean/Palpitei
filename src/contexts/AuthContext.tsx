import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'FREE' | 'PRO';
  role: 'USER' | 'ADMIN';
  memberSince: string;
  subscriptionEnd?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: 'admin@palpitei.com',
    password: 'admin123',
    user: {
      id: '0',
      name: 'Administrador',
      email: 'admin@palpitei.com',
      plan: 'PRO',
      role: 'ADMIN',
      memberSince: '2025-01-01',
      subscriptionEnd: '2027-01-01',
    },
  },
  {
    email: 'demo@palpitei.com',
    password: 'demo123',
    user: {
      id: '1',
      name: 'João Silva',
      email: 'demo@palpitei.com',
      plan: 'PRO',
      role: 'USER',
      memberSince: '2025-08-15',
      subscriptionEnd: '2026-02-15',
    },
  },
  {
    email: 'free@palpitei.com',
    password: 'free123',
    user: {
      id: '2',
      name: 'Maria Santos',
      email: 'free@palpitei.com',
      role: 'USER',
      plan: 'FREE',
      memberSince: '2025-12-01',
    },
  },
];

const AUTH_STORAGE_KEY = 'palpitei_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (found) {
      setUser(found.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(found.user));
      return { success: true };
    }

    return { success: false, error: 'E-mail ou senha incorretos' };
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    const exists = MOCK_USERS.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return { success: false, error: 'Este e-mail já está cadastrado' };
    }

    // Create new user (FREE plan by default)
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      plan: 'FREE',
      role: 'USER',
      memberSince: new Date().toISOString().split('T')[0],
    };

    // Add to mock database
    MOCK_USERS.push({ email, password, user: newUser });

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
