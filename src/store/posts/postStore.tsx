import { create } from "zustand";
import type { Post, PostResponse, ApiError } from "@/app/posts/types";

interface PostStore {
  currentPost: Post | null;
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setCurrentPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  resetState: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  currentPost: null,
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setLoading: (loading) => set({ isLoading: loading }),
  resetState: () => set({ currentPost: null, error: null, isLoading: false }),
}));
