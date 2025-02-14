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
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("로그인이 필요합니다");
      }

      const refreshResponse = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        throw new Error("다시 로그인해주세요.");
      }

      const { accessToken: newAccessToken } = await refreshResponse.json();
      localStorage.setItem("access_token", newAccessToken);

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
};
