"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PostEditForm from "../_components/PostEdit";
import PostDetailView from "./_components/PostDetailView";
import PostActions from "./_components/PostActions";
import { usePostDetail } from "./_hooks/usePostDetail";
import { useEditMode } from "./_hooks/useEditMode";

const PostDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { post, fetchPostDetail, deletePost } = usePostDetail(id as string);
  const { isEditing, setIsEditing, handleEditSuccess } = useEditMode(() =>
    fetchPostDetail()
  );
  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    if (id) {
      fetchPostDetail();
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        뒤로가기
      </button>

      {isEditing ? (
        <PostEditForm
          post={post}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleEditSuccess}
        />
      ) : (
        <>
          <PostDetailView post={post} />
          <PostActions
            isLoggedIn={isLoggedIn}
            onEdit={() => setIsEditing(true)}
            onDelete={deletePost}
          />
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
