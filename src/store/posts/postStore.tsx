import { create } from "zustand";
import { PostStore } from "./types";

export const usePostStore = create<PostStore>((set) => ({
  currentPost: null,
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setLoading: (loading) => set({ isLoading: loading }),
  resetState: () => set({ currentPost: null, error: null, isLoading: false }),
}));
