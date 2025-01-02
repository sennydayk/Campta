import type { Post } from "@/lib/posts/types";

export interface PostStore {
  currentPost: Post | null;
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setCurrentPost: (post: Post | null) => void;
  setLoading: (loading: boolean) => void;
  resetState: () => void;
}
