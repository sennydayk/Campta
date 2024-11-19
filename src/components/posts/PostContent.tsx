"use client";

import { useState } from "react";
import { Bookmark, Trash2, Edit } from "lucide-react";
import { Post } from "@/lib/posts/types";
import { ImageSlider } from "./ImageSlider";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { usePostMutations } from "@/lib/posts/hooks/usePostMutations";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const [isScrap, setIsScrap] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { deletePostMutation } = usePostMutations();

  const isAuthor = user?.uid === post.author?.id;

  const handleDelete = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deletePostMutation.mutateAsync(post.id);
        router.push("/");
      } catch (error) {
        console.error("게시물 삭제 실패:", error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-8 border-b">
      <ImageSlider images={post.images} />
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-2">
          {isAuthor && (
            <>
              <button onClick={() => router.push(`/posts/${post.id}/edit`)}>
                <Edit className="h-6 w-6 text-gray-500 mr-2" />
              </button>
              <button onClick={handleDelete} className="text-red-500">
                <Trash2 className="h-6 w-6 mr-2" />
              </button>
            </>
          )}
          <button onClick={() => setIsScrap(!isScrap)}>
            <Bookmark
              className={`h-6 w-6 ${
                isScrap ? "fill-black text-black-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-600">{post.content}</p>
    </div>
  );
}
