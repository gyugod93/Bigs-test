"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostDetailView from "@/app/components/post/detail/PostDetailView";
import { usePostDetail } from "@/app/hooks/posts/[id]/usePostDetail";
import { useEditMode } from "@/app/hooks/posts/[id]/useEditMode";
import PostEdit from "@/app/components/post/detail/PostEdit";
import Navbar from "@/app/components/navbar/Navbar";

const PostDetailPage = () => {
  const { id } = useParams();
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
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {isEditing ? (
          <PostEdit
            post={post}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleEditSuccess}
          />
        ) : (
          <PostDetailView
            post={post}
            isLoggedIn={isLoggedIn}
            onEdit={() => setIsEditing(true)}
            onDelete={deletePost}
          />
        )}
      </div>
    </>
  );
};

export default PostDetailPage;
