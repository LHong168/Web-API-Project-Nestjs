import { fetchAPI } from "@/helpers/request";
import { User } from "../interface";

export function getUsers() {
  return fetchAPI<User[]>("users", { method: "GET" });
}
