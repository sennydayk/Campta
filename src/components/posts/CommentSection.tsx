import { useState } from "react";
import Button from "../common/ui/Button";
import Comment from "@/components/posts/Comment";
import { CommentProps } from "@/components/posts/Comment";

export function CommentsSection() {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
}
