"use client";

import { useState } from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Comment, { CommentProps } from "@/app/posts/components/Comment";
import Button from "@/components/ui/Button";

const PostContent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isScrap, setIsScrap] = useState(false);
  const images = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-8 border-b">
      <div className="relative">
        <Image
          src={images[currentImage]}
          alt="Post image"
          width={600}
          height={400}
          className="w-full rounded-lg"
        />
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
          onClick={() =>
            setCurrentImage(
              (prev) => (prev - 1 + images.length) % images.length
            )
          }
        >
          <ChevronLeft className="text-gray-600" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
        >
          <ChevronRight className="text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentImage ? "bg-main" : "bg-sub"
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">게시물 제목</h1>
        <button onClick={() => setIsScrap(!isScrap)}>
          <Bookmark
            className={`h-6 w-6 ${
              isScrap ? "fill-black text-black-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      <p className="mt-2 text-gray-600">상세 내용입니다.</p>
    </div>
  );
};

// 댓글 영역
const CommentsSection = () => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 댓글 작성 로직
    console.log("Submitted comment:", newComment);
    setNewComment("");
  };

  const comments: CommentProps[] = [
    {
      username: "닉네임1",
      content: "첫 번째 댓글 내용입니다.",
      timestamp: "2024. 10. 18 20:30",
      depth: 0,
      replies: [
        {
          username: "닉네임2",
          content: "첫 번째 댓글의 답글입니다.",
          timestamp: "2024. 10. 18 20:35",
          depth: 1,
        },
      ],
    },
    {
      username: "닉네임4",
      content: "두 번째 댓글 내용입니다.",
      timestamp: "2024. 10. 18 21:00",
      depth: 0,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글 내용을 입력해주세요."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
          />
          <Button type="submit" label="작성하기" />
        </div>
      </form>
    </div>
  );
};

export default function PostDetailPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-8">
        <PostContent />
        <CommentsSection />
      </main>
    </div>
  );
}
