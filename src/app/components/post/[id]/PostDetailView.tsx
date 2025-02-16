"use client";
import {
  CATEGORY_MAP,
  CategoryKey,
  PostDetailViewProps,
} from "@/app/types/post/postTypes";
import React from "react";

const PostDetailView = ({ post }: PostDetailViewProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="my-4 whitespace-pre-wrap">{post.content}</div>
      <div className="text-sm text-gray-600">
        <p>카테고리: {CATEGORY_MAP[post.category as CategoryKey]}</p>
        <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PostDetailView;
