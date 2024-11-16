"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "@/api/comments/comments";
import Button from "@/components/common/ui/Button";
import Comment from "@/components/comments/Comment";
import { CommentProps, UserProfile } from "@/lib/comments/types";
import { useAuthStore } from "@/store/auth/authStore";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<CommentProps[]>({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.getComments(postId),
  });

  const addCommentMutation = useMutation({
    mutationFn: (
      newCommentData: Omit<CommentProps, "id" | "timestamp" | "replies">
    ) => commentApi.addComment(newCommentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setNewComment("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const userProfile: UserProfile = {
        uid: user.uid,
        nickname: user.nickname || "Anonymous",
        profileImg: user.profileImg || "/default-avatar.png",
      };
      addCommentMutation.mutate({
        postId,
        uid: user.uid,
        content: newComment,
        depth: 0,
        userProfile,
      });
    }
  };

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는데 실패했습니다.</div>;

  const buildCommentTree = (comments: CommentProps[]): CommentProps[] => {
    const commentMap = new Map<string, CommentProps>();
    comments.forEach((comment) =>
      commentMap.set(comment.id, { ...comment, replies: [] })
    );

    const rootComments: CommentProps[] = [];
    commentMap.forEach((comment) => {
      if (comment.depth === 0) {
        rootComments.push(comment);
      } else {
        const parentComment = comments.find((c) => c.id === comment.parentId);
        if (parentComment) {
          parentComment.replies = parentComment.replies || [];
          parentComment.replies.push(comment);
        }
      }
    });

    return rootComments;
  };

  const commentTree = buildCommentTree(comments || []);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      {commentTree.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {user ? (
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
      ) : (
        <div className="mt-6 text-center text-gray-500">
          댓글을 작성하려면 로그인이 필요합니다.
        </div>
      )}
    </div>
  );
}
