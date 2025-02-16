// app/utils/auth/authClient.ts
"use client";

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    throw new Error("로그인이 필요합니다");
  }

  try {
    const response = await fetch(
      "https://front-mission.bigs.or.kr/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("토큰 갱신에 실패했습니다.");
    }

    const tokenData = await response.json();
    localStorage.setItem("access_token", tokenData.accessToken);
    localStorage.setItem("refresh_token", tokenData.refreshToken);
    return tokenData.accessToken;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    throw error;
  }
};

export const authClient = async (url: string, options: RequestInit = {}) => {
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
      const newToken = await refreshAuthToken();
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
