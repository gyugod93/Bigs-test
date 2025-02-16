"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostDetailView from "../../components/post/[id]/PostDetailView";
import PostActions from "../../components/post/[id]/PostActions";
import { usePostDetail } from "../../hooks/posts/[id]/usePostDetail";
import { useEditMode } from "../../hooks/posts/[id]/useEditMode";
import PostEdit from "@/app/components/post/[id]/PostEdit";

const PostDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { post, fetchPostDetail, deletePost } = usePostDetail(id as string);
  const { isEditing, setIsEditing, handleEditSuccess } = useEditMode(() =>
    fetchPostDetail()
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));

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
        <PostEdit
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
