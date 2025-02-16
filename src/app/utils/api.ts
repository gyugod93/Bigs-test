export const fetchWithToken = async (
  url: string,
  options: RequestInit = {}
) => {
  const accessToken = localStorage.getItem("access_token");
  console.log("현재 accessToken:", accessToken);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("첫 요청 응답 상태:", response.status);

    if (response.status === 401) {
      console.log("액세스 토큰 만료 감지");

      const refreshToken = localStorage.getItem("refresh_token");
      console.log("저장된 refreshToken:", refreshToken);

      if (!refreshToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw new Error("로그인이 필요합니다");
      }

      console.log("리프레시 토큰으로 재발급 시도");
      const refreshResponse = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }), // API 스펙에 맞게 수정
        }
      );

      console.log("리프레시 응답 상태:", refreshResponse.status);

      if (!refreshResponse.ok) {
        console.log("리프레시 토큰 재발급 실패");
        const errorData = await refreshResponse.json().catch(() => ({}));
        console.log("리프레시 실패 상세:", errorData);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw new Error("다시 로그인해주세요.");
      }

      const tokenData = await refreshResponse.json();
      console.log("새로운 토큰 발급 성공:", tokenData);

      const newAccessToken = tokenData.accessToken;
      const newRefreshToken = tokenData.refreshToken; // 새로운 리프레시 토큰도 저장

      localStorage.setItem("access_token", newAccessToken);
      localStorage.setItem("refresh_token", newRefreshToken); // 새로운 리프레시 토큰 저장

      console.log("새 액세스 토큰 저장됨:", newAccessToken);

      const newResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      console.log("새 토큰으로 재요청 결과:", newResponse.status);

      if (!newResponse.ok) {
        console.log("새 토큰으로도 요청 실패");
        throw new Error("요청 처리 중 오류가 발생했습니다.");
      }

      return newResponse;
    }

    return response;
  } catch (error) {
    console.error("fetchWithToken 전체 에러:", error);
    throw error;
  }
};
