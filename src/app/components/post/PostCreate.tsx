"use client";
import React from "react";
import { PostType } from "@/app/lib/zod";
import {
  CATEGORIES,
  CATEGORY_MAP,
  PostCreateProps,
} from "@/app/types/post/postTypes";
import { useCreatePost } from "@/app/hooks/posts/useCreatePost";

const PostCreate = ({ onAddPost }: PostCreateProps) => {
  const { form, createPost } = useCreatePost(onAddPost);

  const handlePost = async (data: PostType) => {
    await createPost(data);
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
          <select {...form.register("category")} defaultValue="">
            <option value="" disabled>
              카테고리 선택
            </option>
            {CATEGORIES.map((categoryKey) => (
              <option key={categoryKey} value={categoryKey}>
                {CATEGORY_MAP[categoryKey]}
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
