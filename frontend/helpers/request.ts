import { env } from "@/env.mjs";

export const getStaticURL = (path = "") => {
  return `${env.NEXT_PUBLIC_NESTJS_URL || "http://localhost:3001"}${path}`;
};

export const fetchAPI = async <T>(path: string, options = {}) => {
  // Build request URL
  const requestUrl = getStaticURL(`/${path}`);

  const jwtToken = localStorage.getItem("access_token");

  // Trigger API call
  const response = await fetch(requestUrl, {
    next: { revalidate: 300, tags: ["api"] },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
    ...options,
  });

  // Handle response
  if (!response.ok) {
    throw await response.json();
  }

  return response.json() as T;
};

export const getRequestOption = <T extends object>(body: T) => {
  return { method: "POST", body: JSON.stringify(body) };
};
