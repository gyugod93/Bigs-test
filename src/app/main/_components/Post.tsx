"use client";
import { PostSchema, PostType } from "@/app/lib/zod";
import { fetchWithToken } from "@/app/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type PostProps = {
  id: number;
  title: string;
  content: string;
};

const Post = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });

  const fetchPosts = async () => {
    try {
      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards?page=0&size=10"
      );

      if (!response.ok) {
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      console.log("fetchData", data);
      setPosts(data.content); // ✅ 응답 구조에 따라 수정 필요
    } catch (error) {
      console.error("게시글 불러오는 중 오류 발생:", error);
    }
  };

  const handlePost = async (data: PostType) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      // FormData 생성
      const formData = new FormData();

      // request 객체를 JSON 문자열로 변환하여 추가
      const requestData = {
        title: data.title,
        content: data.content,
        category: data.category,
      };

      // request 필드에 JSON 문자열로 추가
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      // formData.append("request", JSON.stringify(requestData));

      // 파일이 있다면 추가할 수 있음 (선택사항)
      // if (file) {
      //   formData.append("file", file);
      // }

      console.log("전송하는 데이터:", {
        request: JSON.stringify(requestData),
      });

      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards",
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
          body: formData,
        }
      );

      const resultText = await response.text(); // 응답을 JSON이 아닌 텍스트로 받아보기
      console.log("서버 응답 (원본 텍스트):", resultText);

      try {
        const resultJson = JSON.parse(resultText);
        console.log("서버 응답 (JSON 변환):", resultJson);
      } catch (error) {
        console.error("JSON 변환 실패:", error);
      }

      await fetchPosts();
      form.reset();
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      alert(
        error instanceof Error
          ? error.message
          : "게시글 등록 중 오류가 발생했습니다."
      );
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = ["NOTICE", "QNA", "ETC", "FREE"];

  return (
    <div>
      <h1>게시물 작성</h1>
      <form onSubmit={form.handleSubmit(handlePost)}>
        <input {...form.register("title")} placeholder="제목" />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.title.message}
          </p>
        )}

        <textarea {...form.register("content")} placeholder="내용" />
        {form.formState.errors.content && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.content.message}
          </p>
        )}

        <select {...form.register("category")}>
          <option value="" disabled selected>
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
        <button type="submit">게시</button>
      </form>
      <h2>게시글 목록</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default Post;
