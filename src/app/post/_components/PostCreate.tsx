"use client";
import React from "react";
import { PostSchema, PostType } from "@/app/lib/zod";
import { fetchWithToken } from "@/app/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { decodeJWT } from "@/app/utils/jwt";
import { Post, PostCreateProps } from "@/app/types/post";

const categories = ["NOTICE", "QNA", "ETC", "FREE"]; // 카테고리 목록

const PostCreate = ({ onAddPost }: PostCreateProps) => {
  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });

  const handlePost = async (data: PostType) => {
    try {
      // FormData 생성
      const formData = new FormData();

      // request 객체를 JSON 문자열로 변환하여 추가
      const requestData = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      console.log("전송하는 데이터:", {
        request: JSON.stringify(requestData),
      });

      // request 필드에 JSON 문자열로 추가
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      const accessToken = localStorage.getItem("access_token");
      let authorId = null;

      if (accessToken) {
        const decoded = decodeJWT(accessToken);
        if (decoded && decoded.userId) {
          authorId = decoded.userId;
        }
      }

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

      const resultText = await response.text(); // 응답을 JSON이 아닌 텍스트로 받아보기
      console.log("서버 응답 (원본 텍스트):", resultText);

      try {
        const resultJson = JSON.parse(resultText);
        console.log("서버 응답 (JSON 변환):", resultJson);

        const newPost: Post = {
          id: resultJson.id,
          title: data.title,
          content: data.content,
          category: data.category,
          createdAt: new Date().toISOString(),
          authorId: authorId, // 토큰에서 추출한 ID 저장
        };

        onAddPost(newPost); // 변환된 JSON을 전달
        alert("게시글이 등록되었습니다.");
      } catch (error) {
        console.error("JSON 변환 실패:", error);
        alert("게시글은 등록되었으나 응답 처리 중 오류가 발생했습니다.");
      }

      form.reset(); // 폼 초기화
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
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
