"use client";
import React, { useState } from "react";
import PostList from "./PostList";
import { CATEGORIES, CATEGORY_MAP } from "@/app/types/post/postTypes";
import {
  SectionContainer,
  SectionTitle,
  FilterContainer,
  Label,
  Select,
} from "./PostListSection.styles";

const PostListSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const { data, status, error, handleSelectPost } = usePosts();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value === "" ? null : e.target.value;
    setSelectedCategory(categoryId);
  };

  // if (status === "pending") return <div>Loading...</div>;
  // if (status === "error") return <div>Error: {error?.message}</div>;

  // const posts = data?.pages.flatMap((page) => page.content);

  return (
    <SectionContainer>
      <SectionTitle>게시글 목록</SectionTitle>
      <FilterContainer>
        <Label htmlFor="category">카테고리:</Label>
        <Select
          id="category"
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
        >
          <option value="">전체</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_MAP[category]}
            </option>
          ))}
        </Select>
      </FilterContainer>
      <PostList selectedCategory={selectedCategory} />
    </SectionContainer>
  );
};

export default PostListSection;
