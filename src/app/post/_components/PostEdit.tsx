"use client";
import React, { useState } from "react";
import { fetchWithToken } from "@/app/utils/api";

// 카테고리 옵션
const categories = ["NOTICE", "QNA", "ETC", "FREE"];

// 타입 정의
export type PostEditProps = {
  post: {
    id: number;
    title: string;
    content: string;
    category: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
};

const PostEdit: React.FC<PostEditProps> = ({ post, onCancel, onSuccess }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // JSON 요청 생성
      const requestData = {
        title,
        content,
        category,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const response = await fetchWithToken(
        `https://front-mission.bigs.or.kr/boards/${post.id}`,
        {
          method: "PATCH",
          body: formData,
          redirect: "follow",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`게시글 수정 실패: ${errorText}`);
      }

      alert("게시글이 수정되었습니다.");
      onSuccess();
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("수정 권한이 없거나 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          카테고리
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          required
          disabled={isSubmitting}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={isSubmitting}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default PostEdit;
