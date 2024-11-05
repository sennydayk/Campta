import { CommentProps } from "@/lib/comments/types";

export interface CommentStore {
  comments: CommentProps[];
  setComments: (comments: CommentProps[]) => void;
  addComment: (comment: CommentProps) => void;
  updateComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;
}
