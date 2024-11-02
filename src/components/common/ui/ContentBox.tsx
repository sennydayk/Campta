import { Bookmark, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContentBoxProps {
  id: string;
  title: string;
  description: string;
  scraps: number;
  comments: number;
  imageUrl?: string;
}

export default function ContentBox({
  id,
  title,
  description,
  scraps,
  comments,
  imageUrl,
}: ContentBoxProps) {
  return (
    <Link href={`/posts/${id}`} className="block">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex">
          <div className="w-24 h-24 bg-gray-200 rounded-md mr-4 overflow-hidden relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-gray-50 flex justify-end items-center space-x-2">
          <button className="flex items-center text-gray-600 hover:text-main">
            <Bookmark className="w-5 h-5 mr-1" />
            <span>{scraps}</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-main">
            <MessageSquare className="w-5 h-5 mr-1" />
            <span>{comments}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
