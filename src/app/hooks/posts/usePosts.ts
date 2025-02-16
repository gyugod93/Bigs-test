"use client";
import { usePostStore } from "@/app/store/usePostStore";
import { authClient } from "@/app/utils/auth/authClient ";
import { useRouter } from "next/navigation";

export const usePosts = () => {
  const { posts, setPosts, addPost } = usePostStore();
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await authClient(
        "https://front-mission.bigs.or.kr/boards?page=0&size=10"
      );

      if (!response.ok) {
        console.error("게시글 불러오기 실패:", response.status);

        // 401 에러 시 명시적 로그인 페이지 리다이렉트
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/login");
          return;
        }

        throw new Error("게시글을 불러올 수 없습니다.");
      }

      const data = await response.json();
      setPosts(data.content);
    } catch (error) {
      console.error("게시글 불러오는 중 오류 발생:", error);

      // 네트워크 오류 등으로 인한 리다이렉트
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    }
  };

  const handleSelectPost = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  return {
    posts,
    addPost,
    fetchPosts,
    handleSelectPost,
  };
};
