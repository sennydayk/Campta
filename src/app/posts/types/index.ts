export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
}

export interface CommentProps {
  username: string;
  content: string;
  timestamp: string;
  depth: number;
  replies?: CommentProps[];
}
