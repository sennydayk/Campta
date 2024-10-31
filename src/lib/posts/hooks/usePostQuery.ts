import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/api/posts/posts";
import { usePostStore } from "@/store/posts/postStore";
import type { Post, ApiError } from "@/app/posts/types";

export function usePostQuery(postId: string) {
  const { setCurrentPost, setError, setLoading } = usePostStore();

  return useQuery<Post, ApiError>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
}
