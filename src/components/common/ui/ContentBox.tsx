import { Bookmark, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, ForwardedRef } from "react";

interface ContentBoxProps {
  id: string;
  title: string;
  description: string;
  scraps: number;
  comments: number;
  imageUrl?: string;
}

const ContentBox = forwardRef(function ContentBox(
  { id, title, description, scraps, comments, imageUrl }: ContentBoxProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Link href={`/posts/${id}`} className="block no-underline" ref={ref}>
      <article className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex">
          <div className="w-24 h-24 bg-gray-200 rounded-md mr-4 overflow-hidden relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 96px, 96px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                이미지 없음
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-gray-50 flex justify-end items-center space-x-2">
          <button
            className="flex items-center text-gray-600 hover:text-primary"
            aria-label={`스크랩 ${scraps}개`}
          >
            <Bookmark className="w-5 h-5 mr-1" aria-hidden="true" />
            <span>{scraps}</span>
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-primary"
            aria-label={`댓글 ${comments}개`}
          >
            <MessageSquare className="w-5 h-5 mr-1" aria-hidden="true" />
            <span>{comments}</span>
          </button>
        </div>
      </article>
    </Link>
  );
});

ContentBox.displayName = "ContentBox";

export default ContentBox;
