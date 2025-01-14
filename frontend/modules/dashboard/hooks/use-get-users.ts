"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};
