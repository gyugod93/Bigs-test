export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // JWT의 Payload 부분
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(escape(atob(base64))); // UTF-8 한글 깨짐 방지

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return null;
  }
};
