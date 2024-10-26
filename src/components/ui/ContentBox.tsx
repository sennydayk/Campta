import { Bookmark, MessageSquare } from "lucide-react";

interface ContentBoxProps {
  title: string;
  description: string;
  scraps: number;
  comments: number;
}

export default function ContentBox({
  title,
  description,
  scraps,
  comments,
}: ContentBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex">
        <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
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
  );
}
