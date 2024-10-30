"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { PostContent } from "@/components/posts/PostContent";
import { CommentsSection } from "@/components/posts/CommentSection";
import { fetchPost, deletePost } from "../api/posts";
import type { Post } from "../types";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });

  const deleteMutation = useMutation<{ message: string }, Error, string>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      router.push("/");
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      deleteMutation.mutate(postId);
    }
  };

  if (isLoading) return <div className="text-center mt-8">로딩 중...</div>;
  if (isError)
    return (
      <div className="text-center mt-8 text-red-500">
        게시글을 불러오는데 실패했습니다.
      </div>
    );
  if (!post)
    return (
      <div className="text-center mt-8 text-red-500">
        게시글을 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-8">
        <PostContent post={post} onDelete={handleDelete} />
        <CommentsSection />
      </main>
    </div>
  );
}
