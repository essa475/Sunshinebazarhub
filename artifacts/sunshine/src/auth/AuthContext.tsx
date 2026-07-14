import React, { createContext, useContext, useState, useEffect } from 'react';
import { queryClient } from '@/lib/queryClient';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string; // simple base64 of password — demo only, not secure
}

interface AuthContextType {
  user: AuthUser | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'sunshine_users';
const SESSION_KEY = 'sunshine_session';

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function simpleHash(s: string) {
  return btoa(s); // demo only — not a real password hash
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session));
    } catch {}
    setIsLoaded(true);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === simpleHash(password),
    );
    if (!found) return { error: 'Invalid email or password.' };
    const { passwordHash: _, ...authUser } = found;
    // Clear any previous user's cached order data before switching users
    queryClient.removeQueries({ queryKey: ['orders'] });
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return {};
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<{ error?: string }> => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'An account with this email already exists.' };
    }
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      passwordHash: simpleHash(password),
    };
    saveUsers([...users, newUser]);
    queryClient.removeQueries({ queryKey: ['orders'] });
    const { passwordHash: _, ...authUser } = newUser;
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    return {};
  };

  const signOut = () => {
    // Remove order queries so the next user doesn't see a previous user's orders
    queryClient.removeQueries({ queryKey: ['orders'] });
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, isSignedIn: !!user, isLoaded, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
