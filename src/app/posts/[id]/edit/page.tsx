"use client";

import { useRouter, useParams } from "next/navigation";
import { NewPostForm } from "@/components/newpost/NewPostForm";
import { usePostStore } from "@/store/posts/postStore";
import { usePostMutations } from "@/lib/posts/hooks/usePostMutations";
import { usePostQuery } from "@/lib/posts/hooks/usePostQuery";
import { useEffect, useState } from "react";
import { Post } from "../../types";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const { error, setError } = usePostStore();
  const { updatePostMutation } = usePostMutations();
  const { data: post, isLoading } = usePostQuery(postId);

  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
  }, [post]);

  const handleSubmit = async (
    title: string,
    content: string,
    images: File[],
    keepImages: string[]
  ) => {
    if (!currentPost) {
      setError("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // 유지할 이미지 URL 추가
    keepImages.forEach((imageUrl) => {
      formData.append("keepImages", imageUrl);
    });

    // 새 이미지 파일 추가
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const result = await updatePostMutation.mutateAsync({
        id: postId,
        formData,
      });
      console.log("Update result:", result);
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.error("게시물 수정 실패:", error);
      setError("게시물 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-lg text-gray-600">로딩 중...</div>
      </div>
    );

  if (!currentPost)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-lg text-red-600">
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">게시글 수정</h1>
          <NewPostForm
            onSubmit={handleSubmit}
            initialTitle={currentPost.title}
            initialContent={currentPost.content}
            initialImages={currentPost.images}
          />
          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
