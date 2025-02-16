"use client";
import { PostType } from "@/app/lib/zod";
import { authClient } from "@/app/utils/auth/authClient ";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/app/lib/zod";
import { PostProps } from "@/app/types/post/postTypes";

export const useCreatePost = (onAddPost: (post: PostProps) => void) => {
  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });

  const createPost = async (data: PostType) => {
    try {
      const formData = new FormData();
      const requestData = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const response = await authClient(
        "https://front-mission.bigs.or.kr/boards",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("게시글 생성에 실패했습니다.");
      }

      const result = await response.json();

      const newPost: PostProps = {
        id: result.id,
        title: data.title,
        content: data.content,
        category: data.category,
        createdAt: result.createdAt || new Date().toISOString(),
      };

      onAddPost(newPost);
      alert("게시글이 등록되었습니다.");
      form.reset();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "게시글 등록 중 오류가 발생했습니다."
      );
    }
  };

  return {
    form,
    createPost,
  };
};
