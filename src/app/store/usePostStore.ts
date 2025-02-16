import { create } from "zustand";
import { PostProps, PostStore } from "../types/post/postTypes";

export const usePostStore = create<PostStore>()((set, get) => ({
  posts: [],
  setPosts: (posts: PostProps[]) => set({ posts }),
  addPost: (post: PostProps) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  getPostById: (id: number) => get().posts.find((post) => post.id === id),
}));
