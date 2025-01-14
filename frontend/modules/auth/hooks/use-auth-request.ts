import { fetchAPI, getRequestOption } from "@/helpers/request";
import { AccessTokenResponse, AuthLogin, AuthRegister } from "../interface";
import { User } from "@/modules/dashboard/interface";
import { getAuthFromCookies, setAuthInCookies } from "@/helpers/cookies";

export const api = {
  login: async (body: AuthLogin) =>
    fetchAPI<AccessTokenResponse>("auth/login", getRequestOption(body)),
  register: async (body: AuthRegister) =>
    fetchAPI<AccessTokenResponse>("auth/register", getRequestOption(body)),
  logout: async (id: number) =>
    fetchAPI<AccessTokenResponse>(`auth/logout/${id}`, { method: "POST" }),
  readMe: async () => fetchAPI<User>("auth/me", { method: "GET" }),
  refreshToken: async (refreshToken: string) =>
    fetchAPI<AccessTokenResponse>("auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
};

export const getRefreshAccessToken = async () => {
  try {
    const token = await getAuthFromCookies();
    if (!token?.refresh_token) throw new Error("Refresh token not found");

    const res = await api.refreshToken(token.refresh_token);
    if (res.access_token && res.refresh_token) {
      await setAuthInCookies({ ...res });
      return res;
    }
    throw new Error("Unable to refresh access token");
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
};
