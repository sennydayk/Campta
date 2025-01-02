"use client";

import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { commentApi } from "@/api/comments/comments";
import Button from "@/components/common/ui/Button";
import Comment from "@/components/comments/Comment";
import { CommentProps, UserProfile } from "@/lib/comments/types";
import { useAuthStore } from "@/store/auth/authStore";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface CommentApiResponse {
  comments: CommentProps[];
  hasNextPage: boolean;
  nextPage: number | null;
}

interface CommentSectionProps {
  postId: string;
}

const COMMENTS_PER_PAGE = 10;

export function CommentSection({ postId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<CommentApiResponse, Error>({
      queryKey: ["comments", postId],
      queryFn: ({ pageParam = 0 }) =>
        commentApi.getComments(postId, pageParam as number, COMMENTS_PER_PAGE),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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

  if (status === "pending") return <div>댓글을 불러오는 중...</div>;
  if (status === "error") return <div>댓글을 불러오는데 실패했습니다.</div>;

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      <div className="mt-8 text-xs font-semibold text-font_sub">
        {isFetchingNextPage ? (
          <p>더 많은 댓글을 불러오는 중...</p>
        ) : hasNextPage ? (
          <div ref={ref} className="h-10" /> // Intersection observer를 위한 보이지 않는 요소
        ) : (
          <p>모든 댓글을 불러왔습니다.</p>
        )}
      </div>
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
