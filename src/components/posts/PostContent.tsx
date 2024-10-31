import { useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { Post } from "@/app/posts/types";
import { ImageSlider } from "./ImageSlider";

interface PostContentProps {
  post: Post;
  onDelete: () => void;
}

export function PostContent({ post, onDelete }: PostContentProps) {
  const [isScrap, setIsScrap] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-8 border-b">
      <ImageSlider images={post.images} />
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
}