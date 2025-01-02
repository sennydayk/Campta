"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../common/ui/Button";
import { PostFormProps } from "@/lib/posts/types";

export function PostForm({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  initialImages = [],
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState<File[]>([]);
  const [keepImages, setKeepImages] = useState<string[]>(initialImages);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content, images, keepImages);
  };

  const handleRemoveImage = (index: number, isKeepImage: boolean) => {
    if (isKeepImage) {
      setKeepImages(keepImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleImageError = (url: string) => {
    setImageErrors((prev) => ({ ...prev, [url]: true }));
    console.error(`Failed to load image: ${url}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시글 제목을 입력하세요"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="게시글 내용을 입력하세요"
          rows={6}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-main"
        />
      </div>

      <div className="space-y-4">
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          이미지
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {keepImages.map((url, index) => (
            <div key={`keep-${index}`} className="relative aspect-square">
              {imageErrors[url] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                  <span className="text-gray-500">이미지 로드 실패</span>
                </div>
              ) : (
                <Image
                  src={url}
                  alt={`Preview ${index}`}
                  fill
                  className="object-cover rounded-md"
                  onError={() => handleImageError(url)}
                />
              )}
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleRemoveImage(index, true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Remove image</span>
              </button>
            </div>
          ))}
          {images.map((file, index) => (
            <div key={`new-${index}`} className="relative aspect-square">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                fill
                className="object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleRemoveImage(index, false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Remove image</span>
              </button>
            </div>
          ))}
        </div>
        <input
          id="images"
          type="file"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sub file:text-font_btn hover:file:bg-main cursor-pointer"
        />
      </div>
      {initialTitle ? (
        <Button type="submit" label="게시글 수정" />
      ) : (
        <Button type="submit" label="게시글 작성" />
      )}
    </form>
  );
}
