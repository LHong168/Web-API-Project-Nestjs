"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, getRefreshAccessToken } from "./use-auth-request";
import { isNetworkError } from "@/helpers/network-error";
import {
  AuthLogin,
  AuthRegister,
  AuthError,
  AccessTokenResponse,
} from "../interface";
import { useToast } from "@/hooks/use-toast";
import { removeAuthFromCookies, setAuthInCookies } from "@/helpers/cookies";
import { User } from "@/modules/dashboard/interface";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { invalidateQuery } from "@/provider";

interface AuthContextType {
  user?: User | null;
  loading: boolean;
  login: (data: AuthLogin) => Promise<boolean>;
  register: (data: AuthRegister) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAuthSuccess = async (res: AccessTokenResponse) => {
    await setAuthInCookies(res);
    setUser(await api.readMe());
    invalidateQuery();
  };

  const login = async (data: AuthLogin): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await api.login(data);
      if (!res) throw new Error("Login failed.");
      await handleAuthSuccess(res);
      return true;
    } catch (error) {
      handleError(error as AuthError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: AuthRegister): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await api.register(data);
      if (!res?.access_token) throw new Error("Registration failed.");
      await handleAuthSuccess(res);
      return true;
    } catch (error) {
      handleError(error as AuthError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (user?.id) await api.logout(user.id);
    } finally {
      await removeAuthFromCookies();
      setUser(null);
      router.replace(ROUTES.LOGIN);
    }
  };

  const handleError = (error: AuthError) => {
    if (isNetworkError(error)) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Error",
      description: error?.message || "Something went wrong, please try again.",
      variant: "destructive",
    });
    console.error(error);
  };

  const initializeAuth = async () => {
    try {
      setUser(await api.readMe());
    } catch (error) {
      console.error(error);
      const newToken = await getRefreshAccessToken();
      if (newToken) {
        invalidateQuery();
        setUser(await api.readMe());
        return;
      }
      await removeAuthFromCookies();
      setUser(null);
      router.replace(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
