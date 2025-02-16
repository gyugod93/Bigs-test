"use client";
import React, { useEffect } from "react";
import PostCreate from "./_components/PostCreate";
import PostListSection from "./_components/PostListSection";
import { useCategories } from "@/app/hooks/posts/useCategories";
import { usePosts } from "@/app/hooks/posts/usePosts";

const MainPage = () => {
  const { categories, fetchCategories } = useCategories();
  const { posts, addPost, fetchPosts, handleSelectPost } = usePosts();

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <PostCreate onAddPost={addPost} />
      <h1 className="text-2xl font-bold mb-4">게시판</h1>
      <PostListSection
        posts={posts}
        categories={categories}
        onSelectPost={handleSelectPost}
      />
    </div>
  );
};

export default MainPage;
