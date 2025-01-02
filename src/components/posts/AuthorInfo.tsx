import Image from "next/image";
import { Author } from "@/lib/posts/types";

interface AuthorInfoProps {
  author?: Author;
}

export function AuthorInfo({ author }: AuthorInfoProps) {
  if (!author) {
    return (
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <span className="font-semibold text-lg">알 수 없는 사용자</span>
      </div>
    );
  }

  return (
    <div className="flex items-center mb-4">
      <div className="relative w-10 h-10 mr-3">
        {author.profileImg ? (
          <Image
            src={author.profileImg}
            alt={`${author.nickname}'s profile`}
            fill
            className="rounded-full object-cover"
            sizes="40px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full"></div>
        )}
      </div>
      <span className="font-semibold text-lg">{author.nickname}</span>
    </div>
  );
}
