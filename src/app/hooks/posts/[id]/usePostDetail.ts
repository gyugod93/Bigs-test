"use client";
import { PostProps } from "@/app/types/post/postTypes";
import { useState } from "react";
import { authClient } from "@/app/utils/auth/authClient ";
import { useRouter } from "next/navigation";

export const usePostDetail = (postId: string) => {
  const [post, setPost] = useState<PostProps | null>(null);
  const router = useRouter();

  const fetchPostDetail = async () => {
    try {
      const response = await authClient(
        `https://front-mission.bigs.or.kr/boards/${postId}`
      );

      if (!response.ok) {
        console.error("게시글 상세 조회 실패:", response.status);
        throw new Error("게시글 상세 조회 실패");
      }

      const data = await response.json();

      const postData: PostProps = {
        ...data,
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.boardCategory,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      setPost(postData);
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);

      // 네트워크 오류 등으로 인한 리다이렉트
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    }
  };

  const deletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const response = await authClient(
        `https://front-mission.bigs.or.kr/boards/${post?.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        console.error("게시글 삭제 실패:", response.status);

        // 401 에러 시 명시적 로그인 페이지 리다이렉트
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/login");
          return;
        }

        throw new Error("게시글 삭제 실패");
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);

      // 네트워크 오류 등으로 인한 리다이렉트
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    }
  };

  return {
    post,
    fetchPostDetail,
    deletePost,
  };
};
