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
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setPosts(data.content);
    } catch (error) {
      console.error("게시글 불러오는 중 오류 발생:", error);
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
