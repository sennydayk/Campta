export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  comments: number;
  scraps: number;
}

export interface PostResponse {
  id: string;
}

export interface CommentProps {
  username: string;
  content: string;
  timestamp: string;
  depth: number;
  replies?: CommentProps[];
}

export type ApiError = {
  message: string;
};
