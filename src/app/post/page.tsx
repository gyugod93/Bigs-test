"use client";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/app/utils/api";
import PostList from "./_components/PostList";
import PostCreate from "./_components/PostCreate";
import { useRouter } from "next/navigation";
import { usePostStore } from "../store/usePostStore";

// 카테고리 타입 정의
interface Category {
  id: string; // 키 값(NOTICE, FREE 등)
  name: string; // 표시 값(공지, 자유 등)
}

const MainPage = () => {
  const { posts, addPost, setPosts } = usePostStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  // 카테고리 목록 불러오기
  const fetchCategories = async () => {
    try {
      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards/categories"
      );
      if (!response.ok) {
        throw new Error("카테고리를 불러오는데 실패했습니다.");
      }
      const data = await response.json();

      // 객체를 배열로 변환 (더 자세한 디버깅)
      if (data && typeof data === "object" && !Array.isArray(data)) {
        const entries = Object.entries(data);
        console.log("Object.entries 결과:", entries);

        const categoryArray = entries.map(([key, value]) => {
          console.log("변환 중:", key, value);
          return {
            id: key,
            name: value as string,
          };
        });

        console.log("변환된 카테고리 배열:", categoryArray);
        setCategories(categoryArray);
      } else {
        console.error("예상치 못한 카테고리 데이터 구조:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("카테고리 불러오는 중 오류 발생:", error);
      setCategories([]);
    }
  };

  // 게시글 불러오기 (카테고리 필터링 적용)
  const fetchPosts = async () => {
    try {
      // 카테고리 선택 여부에 따라 URL 설정
      let url = "https://front-mission.bigs.or.kr/boards?page=0&size=10";
      if (selectedCategory !== null) {
        url += `&category=${selectedCategory}`;
      }

      const response = await fetchWithToken(url);
      if (!response.ok) {
        throw new Error("게시글을 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setPosts(data.content);
      console.log("fetchData", data);
    } catch (error) {
      console.error("게시글 불러오는 중 오류 발생:", error);
    }
  };

  const handleSelectPost = (postId: number) => {
    console.log(`선택된 게시글 ID: ${postId}`);
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

  // 카테고리 변경 시 게시글 다시 불러오기
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  // categories 상태가 업데이트될 때마다 로그 출력
  useEffect(() => {
    console.log("업데이트된 categories 상태:", categories);
  }, [categories]);

  return (
    <div className="p-4">
      <PostCreate onAddPost={addPost} />

      <h1 className="text-2xl font-bold mb-4">게시판</h1>

      {/* 카테고리 선택 드롭다운 */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-medium">
          카테고리:
        </label>
        <select
          id="category"
          value={selectedCategory === null ? "" : selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded p-1"
        >
          <option value="">전체</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>카테고리를 불러오는 중...</option>
          )}
        </select>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">게시글 목록</h2>
      <PostList posts={posts} onSelectPost={handleSelectPost} />
    </div>
  );
};

export default MainPage;
