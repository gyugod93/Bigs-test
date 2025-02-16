"use client";
import { PostProps } from "@/app/types/post";
import React from "react";

interface PostDetailViewProps {
  post: PostProps;
}

const PostDetailView = ({ post }: PostDetailViewProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="my-4 whitespace-pre-wrap">{post.content}</div>
      <div className="text-sm text-gray-600">
        <p>카테고리: {post.category}</p>
        <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PostDetailView;
