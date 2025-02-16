"use client";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/app/utils/api";
import { useParams, useRouter } from "next/navigation";
import { usePostStore } from "@/app/store/usePostStore";
import PostEditForm from "../_components/PostEdit";

type PostProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  authorId?: number;
};

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  // Zustand 스토어에서 함수 가져오기
  const getPostById = usePostStore((state) => state.getPostById);

  useEffect(() => {
    // 로그인 상태 확인
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    }

    if (id) {
      fetchPostDetail(Number(id));
    }
  }, [id]);

  const fetchPostDetail = async (postId: number) => {
    try {
      const response = await fetchWithToken(
        `https://front-mission.bigs.or.kr/boards/${postId}`
      );

      if (!response.ok) {
        throw new Error("게시글 상세 조회 실패");
      }

      const data = await response.json();

      // 스토어에서 작성자 ID 가져오기 시도
      const storedPost = getPostById(postId);

      // 백엔드 응답을 변환하여 사용
      const postData: PostProps = {
        ...data,
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.boardCategory,
        createdAt: data.createdAt || new Date().toISOString(),
        authorId: storedPost?.authorId,
      };

      setPost(postData);
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetchWithToken(
        `https://front-mission.bigs.or.kr/boards/${post?.id}`,
        {
          method: "DELETE",
          redirect: "follow",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`게시글 삭제 실패: ${errorText}`);
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    if (id) {
      fetchPostDetail(Number(id));
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleGoBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        뒤로가기
      </button>

      {isEditing ? (
        // 수정 모드: 분리된 PostEditForm 컴포넌트 사용
        <PostEditForm
          post={post}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleEditSuccess}
        />
      ) : (
        // 보기 모드
        <>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          <div className="my-4 whitespace-pre-wrap">{post.content}</div>

          <div className="text-sm text-gray-600">
            <p>카테고리: {post.category}</p>
            <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>

          {isLoggedIn && (
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                수정
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetail;
