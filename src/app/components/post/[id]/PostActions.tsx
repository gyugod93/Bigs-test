"use client";
import { PostActionsProps } from "@/app/types/post/postTypes";
import React from "react";

const PostActions = ({ onEdit, onDelete, isLoggedIn }: PostActionsProps) => {
  if (!isLoggedIn) return null;

  return (
    <div className="flex space-x-2 mt-4">
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        수정
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
};

export default PostActions;
