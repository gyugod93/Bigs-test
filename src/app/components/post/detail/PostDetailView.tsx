"use client";
import React from "react";
import {
  CATEGORY_MAP,
  CategoryKey,
  PostDetailViewProps,
} from "@/app/types/post/postTypes";
import {
  PostContainer,
  PostHeader,
  PostTitle,
  PostContent,
  MetaInfo,
  MetaItem,
} from "./PostDetailView.styles";
import PostActions from "./PostActions";

const PostDetailView = ({
  post,
  isLoggedIn,
  onEdit,
  onDelete,
}: PostDetailViewProps) => {
  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostActions
          onEdit={onEdit}
          onDelete={onDelete}
          isLoggedIn={isLoggedIn}
        />
      </PostHeader>
      <PostContent>{post.content}</PostContent>
      <MetaInfo>
        <MetaItem>
          <span>카테고리</span>
          <span>{CATEGORY_MAP[post.category as CategoryKey]}</span>
        </MetaItem>
        <MetaItem>
          <span>작성일</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </MetaItem>
      </MetaInfo>
    </PostContainer>
  );
};

export default PostDetailView;
