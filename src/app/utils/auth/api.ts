"use client";
import { refreshToken } from "./auth";

export const fetchWithToken = async (
  url: string,
  options: RequestInit = {}
) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      const newToken = await refreshToken();
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
};
