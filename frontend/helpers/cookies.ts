"use server";

import { cookies } from "next/headers";

const AUTH_TOKEN_KEY = "auth_token";

export const getAuthFromCookies = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_TOKEN_KEY);
  return accessToken || null;
};

export const setAuthInCookies = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_KEY, token || "");
};

export const removeAuthFromCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
};
