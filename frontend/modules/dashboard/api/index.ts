import { fetchAPI, getRequestOption } from "@/helpers/request";
import { User } from "../interface";
import { CreateFormData } from "../hooks/use-create-form";
import { EditFormData } from "../hooks/use-edit.form";

export async function getUsers() {
  try {
    return fetchAPI<User[]>("users", { method: "GET" });
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function createUsers(body: CreateFormData) {
  try {
    return fetchAPI("users", getRequestOption(body));
  } catch (error) {
    console.error("Error creating user:", error);
    return {};
  }
}

export async function getUserById(id: number) {
  try {
    const res = fetchAPI<User>(`users/${id}`, { method: "GET" });
    return res;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {} as never;
  }
}

export async function updateUsers(id: number, body: EditFormData) {
  try {
    return fetchAPI(`users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return {};
  }
}

export async function deleteUsers(id: number) {
  try {
    return fetchAPI(`users/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return {};
  }
}
