"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, getRefreshAccessToken } from "./use-auth-request";
import { isNetworkError } from "@/helpers/network-error";
import { AuthLogin, AuthRegister, AuthError } from "../interface";
import { useToast } from "@/hooks/use-toast";
import { removeAuthFromCookies, setAuthInCookies } from "@/helpers/cookies";
import { User } from "@/modules/dashboard/interface";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
export interface AuthUser {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

interface Auth {
  isAuthenticated: boolean;
  user?: User | null;
}

interface AuthContextType {
  user?: User | null;
  loading: boolean;
  login: (data: AuthLogin) => Promise<boolean>;
  register: (data: AuthRegister) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<Auth>({ isAuthenticated: false });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function login(data: AuthLogin) {
    try {
      setLoading(true);
      const res = await api.login(data);
      console.log(!!res);
      if (!!res) {
        setAuthInCookies({ ...res });
        setAuth((p) => ({ ...p, isAuthenticated: true }));
        return true;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: unknown) {
      handleError(error as never);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(data: AuthRegister) {
    try {
      setLoading(true);
      const res = await api.register(data);
      if (res.access_token) {
        setAuthInCookies({ ...res });
        setAuth((p) => ({ ...p, isAuthenticated: true }));
        return true;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      handleError(error as never);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await removeAuthFromCookies();
    setAuth({ isAuthenticated: false, user: null });
  }

  function handleError(error: AuthError) {
    if (isNetworkError(error))
      toast({
        title: "Network Error: Please check your internet connection.",
        variant: "destructive",
      });

    if (error.statusCode === 401) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });

    console.error(error);
  }

  useEffect(() => {
    (async function checkAuth() {
      try {
        const user = await api.readMe();
        if (user) {
          setAuth((p) => ({ ...p, user }));
        }
      } catch (error) {
        if (!auth.isAuthenticated && !auth.user) return;

        const newToken = await getRefreshAccessToken();
        if (newToken) {
          setAuth((p) => ({ ...p, isAuthenticated: true }));
          return;
        }

        await removeAuthFromCookies();
        router.replace(ROUTES.LOGIN);
        console.error(error);
      }
    })();
  }, [auth.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user: auth.user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("auth must be used within a AuthProvider");
  }

  return context;
};
