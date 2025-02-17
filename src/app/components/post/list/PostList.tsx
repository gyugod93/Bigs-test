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
import React, { useEffect, useRef } from "react";
import { usePosts } from "@/app/hooks/posts/usePosts";

const PostList = ({ selectedCategory }: PostListProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    handleSelectPost,
  } = usePosts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error?.message}</div>;

  const allPosts =
    data?.pages
      .flatMap((page) => page.content)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ) ?? [];
  const posts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  return (
    <PostListContainer>
      {posts.map((post) => (
        <PostItem key={post.id} onClick={() => handleSelectPost(post.id)}>
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

      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage ? (
          <div>로딩 중...</div>
        ) : hasNextPage ? (
          <div>스크롤하여 더 보기</div>
        ) : (
          <div>모든 게시글을 불러왔습니다</div>
        )}
      </div>
    </PostListContainer>
  );
};

export default PostList;
