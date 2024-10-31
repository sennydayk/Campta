import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/newPost";
import { deletePost } from "@/api/posts/posts";
import { usePostStore } from "@/store/posts/postStore";
import type { PostResponse, ApiError } from "@/app/posts/types";

export function usePostMutations() {
  const queryClient = useQueryClient();
  const { setError, setLoading, resetState } = usePostStore();

  const createPostMutation = useMutation<PostResponse, ApiError, FormData>({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setLoading(false);
      setError(null);
    },
    onError: (error: ApiError) => {
      setError(error.message);
      setLoading(false);
    },
  });

  const deletePostMutation = useMutation<{ message: string }, ApiError, string>(
    {
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        resetState();
      },
      onError: (error: ApiError) => {
        setError(error.message);
        setLoading(false);
      },
    }
  );

  return {
    createPostMutation,
    deletePostMutation,
  };
}
