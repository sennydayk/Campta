"use client";

import { useState } from "react";

export interface CommentProps {
  username: string;
  content: string;
  timestamp: string;
  depth: number;
  replies?: CommentProps[];
}

export default function Comment({
  username,
  content,
  timestamp,
  depth,
  replies,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reply submission
    console.log("Submitted reply:", replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className={`mt-4 ${depth > 0 ? "pl-5" : ""}`}>
      <div className="flex justify-between items-center">
        <span className="font-semibold">{username}</span>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="mt-1">{content}</p>
      {depth === 0 && (
        <button
          className="mt-1 text-sm text-blue-500 hover:text-blue-600"
          onClick={() => setIsReplying(!isReplying)}
        >
          답글 쓰기
        </button>
      )}
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 입력해주세요."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
            >
              답글 작성
            </button>
          </div>
        </form>
      )}
      {replies &&
        replies.map((reply, index) => (
          <Comment key={index} {...reply} depth={depth + 1} />
        ))}
    </div>
  );
}
