import { fetchWithToken } from "@/app/utils/api";
import { PostType } from "@/app/lib/zod";
import { PostProps } from "@/app/types/post";

export async function createPost(data: PostType): Promise<PostProps> {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const requestData = {
    title: data.title,
    content: data.content,
    category: data.category,
  };

  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(requestData)], { type: "application/json" })
  );

  try {
    const response = await fetchWithToken(
      "https://front-mission.bigs.or.kr/boards",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    // 서버 응답을 PostProps 형식에 맞게 변환
    const newPost: PostProps = {
      id: result.id,
      title: data.title,
      content: data.content,
      category: data.category,
      createdAt: result.createdAt || new Date().toISOString(),
    };

    return newPost;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "게시글 생성 중 오류가 발생했습니다."
    );
  }
}
