"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";

export const useGetSingleUser = (id: number) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(id),
  });
};
