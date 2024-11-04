"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "@/api/comments/comments";
import Button from "@/components/common/ui/Button";
import { CommentProps } from "@/lib/comments/types";

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function Comment({
  id,
  postId,
  username,
  content,
  timestamp,
  depth = 0,
  replies,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(content);

  const queryClient = useQueryClient();

  const addReplyMutation = useMutation({
    mutationFn: (
      newReply: Omit<CommentProps, "id" | "timestamp" | "replies">
    ) => commentApi.addComment(newReply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setIsReplying(false);
      setReplyContent("");
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      commentApi.updateComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setIsEditing(false);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: commentApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReplyMutation.mutate({
      postId,
      username: "Current User", // 유저 정보로 대체해야 함
      content: replyContent,
      parentId: id,
      depth: depth + 1,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommentMutation.mutate({ id, content: editContent });
  };

  const handleDelete = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(id);
    }
  };

  return (
    <div
      className={`mt-4 ${depth > 0 ? "pl-8 border-l-2 border-gray-200" : ""}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">{username}</span>
        <span className="text-sm text-gray-500">
          {formatTimestamp(timestamp)}
        </span>
      </div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="mt-2">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
          />
          <div className="mt-2 space-x-2">
            <Button type="submit" label="수정하기" />
            <Button
              type="button"
              label="취소"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      ) : (
        <p className="mt-1">{content}</p>
      )}
      {!isEditing && (
        <div className="mt-1 space-x-2">
          {(depth === 0 || depth === undefined) && (
            <>
              <button
                className="text-sm text-font_sub hover:text-main"
                onClick={() => setIsReplying(!isReplying)}
              >
                답글 쓰기
              </button>
            </>
          )}
          <button
            className="text-sm text-font_sub hover:text-main"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
          <button
            className="text-sm text-font_sub hover:text-main"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      )}
      {isReplying && depth === 0 && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 입력해주세요."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            />
            <Button type="submit" label="답글쓰기" />
          </div>
        </form>
      )}
      {replies && replies.map((reply) => <Comment key={reply.id} {...reply} />)}
    </div>
  );
}
