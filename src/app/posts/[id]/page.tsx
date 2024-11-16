"use client";

import { useRouter, useParams } from "next/navigation";
import { PostContent } from "@/components/posts/PostContent";
import { CommentSection } from "@/components/comments/CommentSection";
import { AuthorInfo } from "@/components/posts/AuthorInfo";
import { usePostStore } from "@/store/posts/postStore";
import { usePostQuery } from "@/lib/posts/hooks/usePostQuery";
import { usePostMutations } from "@/lib/posts/hooks/usePostMutations";
import { useEffect } from "react";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const { setCurrentPost, setError, setLoading } = usePostStore();
  const { deletePostMutation } = usePostMutations();

  const { data: post, isLoading, error } = usePostQuery(postId);

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
      setLoading(false);
      setError(null);
    }
  }, [post, setCurrentPost, setLoading, setError]);

  useEffect(() => {
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [error, setError, setLoading]);

  const handleDelete = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deletePostMutation.mutateAsync(postId);
        router.push("/");
      } catch (error) {
        console.error("게시물 삭제 실패:", error);
      }
    }
  };

  if (isLoading) return <div className="text-center mt-8">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        게시글을 불러오는데 실패했습니다: {error.message}
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
        <div className="max-w-4xl mx-auto bg-bg rounded-lg overflow-hidden">
          <div className="p-6">
            <AuthorInfo author={post.author} />
            <PostContent post={post} onDelete={handleDelete} />
          </div>
        </div>
        <CommentSection postId={postId} />
      </main>
    </div>
  );
}
