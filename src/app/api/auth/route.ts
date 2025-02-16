// app/api/auth/route.ts

export async function refreshTokenAPI(refreshToken: string) {
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

  return response.json();
}
