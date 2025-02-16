import React from "react";

// 타입을 재정의하지 말고 공유 타입을 가져옵니다
import { PostProps } from "@/app/types/post";

type PostListProps = {
  posts: PostProps[];
  onSelectPost: (postId: number) => void;
};

const PostList = ({ posts, onSelectPost }: PostListProps) => {
  console.log("postlistposts", posts);
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className="border rounded p-4 cursor-pointer"
          onClick={() => onSelectPost(post.id)}
        >
          <h3 className="text-lg font-semibold">{post.title}</h3> {/* 제목 */}
          <p className="text-gray-500">카테고리: {post.category}</p>{" "}
          {/* 카테고리 */}
          <p className="text-gray-400 text-sm">
            작성일: {new Date(post.createdAt).toLocaleDateString()}{" "}
            {/* 작성일 */}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
