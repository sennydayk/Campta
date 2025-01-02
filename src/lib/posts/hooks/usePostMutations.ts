import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/posts";
import { updatePost, deletePost } from "@/api/posts/posts";
import { usePostStore } from "@/store/posts/postStore";
import type { Post, PostResponse, ApiError } from "../types";

export function usePostMutations() {
  const queryClient = useQueryClient();
  const { setError } = usePostStore();

  const createPostMutation = useMutation<PostResponse, ApiError, FormData>({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: ApiError) => {
      setError(error.message);
    },
  });

  const updatePostMutation = useMutation<
    Post,
    ApiError,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }) => updatePost(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: ApiError) => {
      setError(error.message);
    },
  });

  const deletePostMutation = useMutation<{ message: string }, ApiError, string>(
    {
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: ApiError) => {
        setError(error.message);
      },
    }
  );

  return {
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
}
