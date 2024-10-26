"use client";

import { useState } from "react";
import { PostImageUploader } from "./components/PostImageUploader";
import { NewPostForm } from "./components/NewPostForm";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시글 작성 로직
    console.log("Submitted post:", { title, content, images });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">새 게시글 작성</h1>
        <NewPostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          onSubmit={handleSubmit}
        >
          <PostImageUploader images={images} setImages={setImages} />
        </NewPostForm>
      </main>
    </div>
  );
}
