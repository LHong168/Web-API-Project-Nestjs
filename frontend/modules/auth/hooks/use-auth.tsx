"use client";

import { createContext, useContext, useState } from "react";
import { api } from "./use-auth-request";
import { isNetworkError } from "@/helpers/network-error";
import { AuthLogin, AuthRegister, AuthError } from "../interface";
import { useToast } from "@/hooks/use-toast";

export interface AuthUser {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

interface AuthContextType {
  loading: boolean;
  login: (data: AuthLogin) => Promise<void>;
  register: (data: AuthRegister) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function login(data: AuthLogin) {
    try {
      setLoading(true);
      const res = await api.login(data);
      localStorage.setItem("access_token", res.access_token as never);
    } catch (error: unknown) {
      handleError(error as never);
    } finally {
      setLoading(false);
    }
  }

  async function register(data: AuthRegister) {
    try {
      setLoading(true);
      const res = await api.register(data);
      localStorage.setItem("access_token", res.access_token as never);
    } catch (error) {
      handleError(error as never);
    } finally {
      setLoading(false);
    }
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

  return (
    <AuthContext.Provider value={{ loading, login, register }}>
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
