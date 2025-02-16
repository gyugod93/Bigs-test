"use client";
import {
  CATEGORY_MAP,
  CategoryKey,
  PostListProps,
} from "@/app/types/post/postTypes";
import {
  PostListContainer,
  PostItem,
  PostTitle,
  MetaInfo,
  MetaItem,
  MetaValue,
} from "./PostList.styles";
import React from "react";

const PostList = ({ posts, onSelectPost }: PostListProps) => {
  return (
    <PostListContainer>
      {posts.map((post) => (
        <PostItem key={post.id} onClick={() => onSelectPost(post.id)}>
          <PostTitle>{post.title}</PostTitle>
          <MetaInfo>
            <div>
              <MetaItem>카테고리:</MetaItem>
              <MetaValue>
                {CATEGORY_MAP[post.category as CategoryKey]}
              </MetaValue>
            </div>
            <div>
              <MetaItem>작성일:</MetaItem>
              <MetaValue>
                {new Date(post.createdAt).toLocaleDateString()}
              </MetaValue>
            </div>
          </MetaInfo>
        </PostItem>
      ))}
    </PostListContainer>
  );
};

export default PostList;
