import { PostType } from "@/app/lib/zod";
import { fetchWithToken } from "@/app/utils/api";
import { useState, useEffect } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetchWithToken(
        "https://front-mission.bigs.or.kr/boards"
      );
      if (!response.ok) throw new Error("게시글을 불러오는데 실패했습니다.");
      const data = await response.json();
      setPosts(data.content ?? data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (data: PostType) => {
    /* POST 요청 로직 */
  };
  const updatePost = async (postId: number, data: PostType) => {
    /* PATCH 요청 로직 */
  };
  const deletePost = async (postId: number) => {
    /* DELETE 요청 로직 */
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, createPost, updatePost, deletePost };
};
