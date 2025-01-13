import { fetchAPI, getRequestOption } from "@/helpers/request";
import { AccessTokenResponse, AuthLogin, AuthRegister } from "../interface";

export const api = {
  login: async (body: AuthLogin) =>
    fetchAPI<AccessTokenResponse>("auth/login", getRequestOption(body)),
  register: async (body: AuthRegister) =>
    fetchAPI<AccessTokenResponse>("auth/register", getRequestOption(body)),
};
