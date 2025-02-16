"use client";
import React, { useState } from "react";
import PostList from "./PostList";
import {
  CATEGORIES,
  CATEGORY_MAP,
  PostListSectionProps,
} from "@/app/types/post/postTypes";

const PostListSection = ({ posts, onSelectPost }: PostListSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value === "" ? null : e.target.value;
    setSelectedCategory(categoryId);
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-2">게시글 목록</h2>
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-medium">
          카테고리:
        </label>
        <select
          id="category"
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
          className="border rounded p-1"
        >
          <option value="">전체</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_MAP[category]}
            </option>
          ))}
          ``
        </select>
      </div>
      <PostList posts={filteredPosts} onSelectPost={onSelectPost} />
    </div>
  );
};

export default PostListSection;
