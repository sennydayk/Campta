"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { Bookmark, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Comment, { CommentProps } from "@/app/posts/components/Comment";
import Button from "@/components/ui/Button";

// Post 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
}

async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return response.json();
}

async function deletePost(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("게시글을 삭제하는데 실패했습니다.");
  }
  return response.json();
}

const PostContent = ({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: () => void;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isScrap, setIsScrap] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-8 border-b">
      <div className="flex justify-center max-w-2xl mx-auto">
        {post.images && post.images.length > 0 ? (
          <Image
            src={post.images[currentImage]}
            alt="Post image"
            width={300}
            height={200}
            className="w-80 rounded-lg"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
            No Image
          </div>
        )}
        {post.images && post.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
              onClick={() =>
                setCurrentImage(
                  (prev) => (prev - 1 + post.images.length) % post.images.length
                )
              }
            >
              <ChevronLeft className="text-gray-600" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
              onClick={() =>
                setCurrentImage((prev) => (prev + 1) % post.images.length)
              }
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </>
        )}
      </div>
      {post.images && post.images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {post.images.map((_, index: number) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? "bg-main" : "bg-sub"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsScrap(!isScrap)}>
            <Bookmark
              className={`h-6 w-6 ${
                isScrap ? "fill-black text-black-500" : "text-gray-500"
              }`}
            />
          </button>
          <button onClick={onDelete} className="text-red-500">
            <Trash2 className="h-6 w-6" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-600">{post.content}</p>
    </div>
  );
};

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
