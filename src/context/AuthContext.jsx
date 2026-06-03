import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchMe, login as apiLogin, signup as apiSignup } from '../api/auth';
import { setToken, getToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await fetchMe();
      setUser(me);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const applyAuthResponse = (response) => {
    setToken(response.token);
    setUser(response.user);
    return { ok: true };
  };

  const login = async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      return applyAuthResponse(response);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const response = await apiSignup({ email, password, displayName });
      return applyAuthResponse(response);
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isAuthenticated = Boolean(user);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin,
      isAuthenticated,
      login,
      signup,
      logout,
      refreshUser: loadUser,
    }),
    [user, loading, isAdmin, isAuthenticated, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
