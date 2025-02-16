"use client";
import { useState } from "react";
import { usePostStore } from "@/app/store/usePostStore";
import { authClient } from "@/app/utils/auth/authClient ";
import { PostProps } from "@/app/types/post";
import { useRouter } from "next/navigation";

export const usePostDetail = (postId: string) => {
  const [post, setPost] = useState<PostProps | null>(null);
  const router = useRouter();
  const getPostById = usePostStore((state) => state.getPostById);

  const fetchPostDetail = async () => {
    try {
      const response = await authClient(
        `https://front-mission.bigs.or.kr/boards/${postId}`
      );

      if (!response.ok) {
        throw new Error("게시글 상세 조회 실패");
      }

      const data = await response.json();
      const storedPost = getPostById(Number(postId));

      const postData: PostProps = {
        ...data,
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.boardCategory,
        createdAt: data.createdAt || new Date().toISOString(),
        authorId: storedPost?.authorId,
      };

      setPost(postData);
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);
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
        throw new Error("게시글 삭제 실패");
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  return {
    post,
    fetchPostDetail,
    deletePost,
  };
};
