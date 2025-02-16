"use client";
import { PostProps } from "@/app/types/post";
import React from "react";

interface PostListProps {
  posts: PostProps[];
  onSelectPost: (postId: number) => void;
}

const PostList = ({ posts, onSelectPost }: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className="border rounded p-4 cursor-pointer"
          onClick={() => onSelectPost(post.id)}
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-gray-500">카테고리: {post.category}</p>
          <p className="text-gray-400 text-sm">
            작성일: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
