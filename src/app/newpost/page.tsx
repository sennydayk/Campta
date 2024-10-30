"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NewPostForm } from "./components/NewPostForm";
import { useRouter } from "next/navigation";

async function createPost(postData: FormData) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: postData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시글 등록에 실패했습니다.");
  }
  return response.json();
}

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      router.push(`/posts/${data.id}`);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

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

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">새 게시글 작성</h1>
        <NewPostForm onSubmit={handleSubmit} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </main>
    </div>
  );
}
