import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/api/posts/posts";
import type { Post, ApiError } from "../types";

export function usePostQuery(postId: string) {
  return useQuery<Post, ApiError>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
}
