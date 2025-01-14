"use server";

import { AccessTokenResponse } from "@/modules/auth/interface";
import { cookies } from "next/headers";

const AUTH_TOKEN_KEY = "auth_token";

export const getAuthFromCookies =
  async (): Promise<AccessTokenResponse | null> => {
    try {
      const cookieStore = await cookies();
      const authTokens = cookieStore.get(AUTH_TOKEN_KEY);
      if (!authTokens) return null;
      return JSON.parse(authTokens.value);
    } catch (error) {
      console.error("Failed to parse auth tokens from cookies", error);
      return null;
    }
  };

export const setAuthInCookies = async (tokens: AccessTokenResponse) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_KEY, JSON.stringify(tokens) || "");
};

export const removeAuthFromCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
};
