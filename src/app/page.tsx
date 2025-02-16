"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { usePosts } from "./hooks/posts/usePosts";
import PostCreate from "./components/post/PostCreate";
import PostListSection from "./components/post/PostListSection";
import { useCategories } from "./hooks/posts/useCategories";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { categories, fetchCategories } = useCategories();
  const { posts, addPost, fetchPosts, handleSelectPost } = usePosts();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
      return;
    }

    const initializeData = async () => {
      try {
        await Promise.all([fetchCategories(), fetchPosts()]);
        setIsLoading(false);
      } catch (error) {
        console.error("데이터 초기화 중 오류:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
      }
    };
    initializeData();
    // fetchCategories();
    // fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <PostCreate onAddPost={addPost} />
        <h1 className="text-2xl font-bold mb-4">게시판</h1>
        <PostListSection posts={posts} onSelectPost={handleSelectPost} />
      </div>
    </>
  );
};

export default HomePage;
