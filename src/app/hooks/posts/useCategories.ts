"use client";
import { useState } from "react";
import { authClient } from "@/app/utils/auth/authClient ";
import { Category } from "@/app/types/post";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await authClient(
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

  return {
    categories,
    fetchCategories,
  };
};
