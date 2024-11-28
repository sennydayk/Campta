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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const ContentBox = forwardRef(function ContentBox(
  { id, title, description, scraps, comments, imageUrl }: ContentBoxProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  const truncatedTitle = truncateText(title, 10);
  const truncatedDescription = truncateText(description, 50);

  return (
    <Link href={`/posts/${id}`} className="block no-underline" ref={ref}>
      <article className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-24 h-32 bg-gray-200 rounded-md overflow-hidden">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={truncatedTitle}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  이미지 없음
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <h2 className="text-xl font-semibold mb-2" title={title}>
                {truncatedTitle}
              </h2>
              <p className="text-gray-600 flex-1" title={description}>
                {truncatedDescription}
              </p>
            </div>
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
