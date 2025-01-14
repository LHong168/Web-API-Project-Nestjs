import { fetchAPI, getRequestOption } from "@/helpers/request";
import { AccessTokenResponse, AuthLogin, AuthRegister } from "../interface";
import { User } from "@/modules/dashboard/interface";

export const api = {
  login: async (body: AuthLogin) =>
    fetchAPI<AccessTokenResponse>("auth/login", getRequestOption(body)),
  register: async (body: AuthRegister) =>
    fetchAPI<AccessTokenResponse>("auth/register", getRequestOption(body)),
  readMe: async () => fetchAPI<User>("auth/me", { method: "GET" }),
};
