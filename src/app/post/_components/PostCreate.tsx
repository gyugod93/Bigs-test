"use client";
import React from "react";
import { PostSchema, PostType } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PostCreateProps } from "@/app/types/post";
import { createPost } from "@/app/api/posts/route";

const categories = ["NOTICE", "QNA", "ETC", "FREE"];

const PostCreate = ({ onAddPost }: PostCreateProps) => {
  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });

  const handlePost = async (data: PostType) => {
    try {
      const newPost = await createPost(data);
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

  return (
    <div>
      <h1>게시물 작성</h1>
      <form onSubmit={form.handleSubmit(handlePost)}>
        <div>
          <label>제목</label>
          <input {...form.register("title")} placeholder="제목" />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label>내용</label>
          <textarea {...form.register("content")} placeholder="내용" />
          {form.formState.errors.content && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label>카테고리</label>
          <select {...form.register("category")}>
            <option value="" disabled>
              카테고리 선택
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {form.formState.errors.category && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        <button type="submit">게시</button>
      </form>
    </div>
  );
};

export default PostCreate;
