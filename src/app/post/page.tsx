"use client";
import React, { useEffect, useState, useMemo } from "react";
import { fetchWithToken } from "@/app/utils/api";
import PostList from "./_components/PostList";
import PostCreate from "./_components/PostCreate";
import { useRouter } from "next/navigation";
import { usePostStore } from "../store/usePostStore";

interface Category {
  id: string;
  name: string;
}

const MainPage = () => {
  const { posts, addPost, setPosts } = usePostStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards/categories"
      );
      if (!response.ok) {
        throw new Error("카테고리를 불러오는데 실패했습니다.");
      }
      const data = await response.json();

      if (data && typeof data === "object" && !Array.isArray(data)) {
        const categoryArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          name: value as string,
        }));
        setCategories(categoryArray);
      }
    } catch (error) {
      console.error("카테고리 불러오는 중 오류 발생:", error);
      setCategories([]);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards?page=0&size=10"
      );
      if (!response.ok) {
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setPosts(data.content);
    } catch (error) {
      console.error("게시글 불러오는 중 오류 발생:", error);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handleSelectPost = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value === "" ? null : e.target.value;
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <PostCreate onAddPost={addPost} />
      <h1 className="text-2xl font-bold mb-4">게시판</h1>

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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">게시글 목록</h2>
      <PostList posts={filteredPosts} onSelectPost={handleSelectPost} />
    </div>
  );
};

export default MainPage;
