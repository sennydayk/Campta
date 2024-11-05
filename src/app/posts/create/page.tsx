"use client";

import { useRouter } from "next/navigation";
import { PostForm } from "@/components/posts/PostForm";
import { usePostStore } from "@/store/posts/postStore";
import { usePostMutations } from "@/lib/posts/hooks/usePostMutations";

export default function NewPostPage() {
  const router = useRouter();
  const { error } = usePostStore();
  const { createPostMutation } = usePostMutations();

  const handleSubmit = async (
    title: string,
    content: string,
    images: File[]
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const data = await createPostMutation.mutateAsync(formData);
      router.push(`/posts/${data.id}`);
    } catch (error) {
      console.error("게시물 생성 실패:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">새 게시글 작성</h1>
        <PostForm onSubmit={handleSubmit} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}
