export const decodeJWT = (token: string) => {
  try {
    //index[1] = payload
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return null;
  }
};
