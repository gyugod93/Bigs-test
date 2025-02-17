"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts } from "./hooks/posts/usePosts";
import PostListSection from "./components/post/list/PostListSection";
import { useCategories } from "./hooks/posts/useCategories";
import Navbar from "./components/navbar/Navbar";
import PostCreate from "./components/post/create/PostCreate";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCategories } = useCategories();
  const { data, status, error, handleSelectPost } = usePosts();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
      return;
    }

    // 카테고리만 따로 fetch
    fetchCategories().catch((error) => {
      console.error("카테고리 로드 중 오류:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    });

    // const initializeData = async () => {
    //   try {
    //     await Promise.all([fetchCategories(), fetchPosts()]);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("데이터 초기화 중 오류:", error);
    //     localStorage.removeItem("access_token");
    //     localStorage.removeItem("refresh_token");
    //     router.push("/login");
    //   }
    // };
    // initializeData();
  }, []);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error?.message}</div>;
  }

  // data.pages에서 모든 게시글을 하나의 배열로 변환
  const posts = data?.pages.flatMap((page) => page.content);
  console.log("check posts", posts);
  return (
    <>
      <Navbar />
      <div className="p-4">
        <PostCreate />
        <PostListSection posts={posts} onSelectPost={handleSelectPost} />
      </div>
    </>
  );
};

export default HomePage;
