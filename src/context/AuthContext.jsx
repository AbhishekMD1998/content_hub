import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'content-hub-admin-session';

const ADMIN_EMAIL = 'admin@contenthub.com';
const ADMIN_PASSWORD = 'admin123';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
      return { ok: true };
    }
    return { ok: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  const value = useMemo(
    () => ({ isAdmin, login, logout }),
    [isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
