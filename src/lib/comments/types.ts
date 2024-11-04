export interface CommentProps {
  id: string;
  postId: string;
  username: string;
  content: string;
  timestamp: string;
  parentId?: string;
  depth: number;
  replies?: CommentProps[];
}
