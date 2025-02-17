"use client";
import { authClient } from "@/app/utils/auth/authClient ";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePosts = () => {
  // const { posts, setPosts, addPost } = usePostStore();
  const router = useRouter();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const response = await authClient(
      `https://front-mission.bigs.or.kr/boards?page=${pageParam}&size=10`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching, //fetching상태
    isFetchingNextPage, //다음 페이지 fetching 상태
    status, //pending | error | success
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    initialPageParam: 0,
  });

  const handleSelectPost = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  return {
    data, // 전체 페이지 데이터 (data.pages로 접근)
    error, // 에러 객체
    fetchNextPage, // 다음 페이지 수동 로드 함수
    hasNextPage, // 다음 페이지 존재 여부
    isFetching, // 데이터 fetching 중 여부
    isFetchingNextPage, // 다음 페이지 로딩 중 여부
    status, // 쿼리 상태
    handleSelectPost,
  };
};

//   return {
//     posts,
//     addPost,
//     fetchPosts,
//   };
// };

// const fetchPosts = async () => {
//   try {
//     const response = await authClient(
//       "https://front-mission.bigs.or.kr/boards?page=0&size=10"
//     );

//     if (!response.ok) {
//       console.error("게시글 불러오기 실패:", response.status);

//       // 401 에러 시 명시적 로그인 페이지 리다이렉트
//       if (response.status === 401) {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         router.push("/login");
//         return;
//       }

//       throw new Error("게시글을 불러올 수 없습니다.");
//     }

//     const data = await response.json();
//     setPosts(data.content);
//   } catch (error) {
//     console.error("게시글 불러오는 중 오류 발생:", error);

//     // 네트워크 오류 등으로 인한 리다이렉트
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     router.push("/login");
//   }
// };
