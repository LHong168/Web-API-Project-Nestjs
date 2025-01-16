'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { ROUTES } from '@/config/routes';
import { removeAuthFromCookies, setAuthInCookies } from '@/helpers/cookies';
import { useError } from '@/hooks/use-error';
import { User } from '@/modules/dashboard/interface';
import { invalidateQuery } from '@/provider';

import { AccessTokenResponse, AuthLogin, AuthRegister } from '../interface';
import { api, getRefreshAccessToken } from './use-auth-request';

interface AuthContextType {
  user?: User | null;
  loading: boolean;
  login: (data: AuthLogin) => Promise<boolean>;
  register: (data: AuthRegister) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<{ isAuth: boolean; user: User | null }>({ isAuth: false, user: null });
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();
  const router = useRouter();

  const handleAuthSuccess = async (res: AccessTokenResponse) => {
    await setAuthInCookies(res);
    const user = await api.readMe();
    setAuth({ isAuth: true, user });
    invalidateQuery();
  };

  const login = async (data: AuthLogin): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await api.login(data);
      if (!res) throw new Error('Login failed.');
      await handleAuthSuccess(res);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: AuthRegister): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await api.register(data);
      if (!res?.access_token) throw new Error('Registration failed.');
      await handleAuthSuccess(res);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (auth.user?.id) await api.logout();
    } finally {
      await removeAuthFromCookies();
      setAuth({ isAuth: false, user: null });
      router.replace(ROUTES.LOGIN);
    }
  };

  const initializeAuth = async () => {
    try {
      const user = await api.readMe();
      if (user) return setAuth({ isAuth: true, user });
    } catch (error) {
      const newToken = await getRefreshAccessToken();
      if (newToken) {
        invalidateQuery();
        return;
      }
      await removeAuthFromCookies();
      setAuth({ isAuth: false, user: null });
      router.replace(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [auth.isAuth]);

  return (
    <AuthContext.Provider value={{ user: auth.user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
};
