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

export type ApiError = {
  message: string;
};
