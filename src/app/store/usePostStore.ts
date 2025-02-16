// import { create } from "zustand";
// import { PostState } from "../types/post";

// export const usePostStore = create<PostState>((set) => ({
//   posts: [],
//   addPost: (newPost) => set((state) => ({ posts: [newPost, ...state.posts] })),
//   setPosts: (newPosts) => set(() => ({ posts: newPosts })),
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post, PostStore } from "../types/post";

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],

      setPosts: (posts: Post[]) => set({ posts }),

      addPost: (post: Post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),

      getPostById: (id: number) => get().posts.find((post) => post.id === id),

      isAuthor: (id: number, currentUserId: number) => {
        const post = get().posts.find((post) => post.id === id);
        return post?.authorId === currentUserId;
      },
    }),
    {
      name: "post-storage", // localStorage에 저장될 키 이름
    }
  )
);
