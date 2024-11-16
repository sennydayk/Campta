export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  comments: number;
  scraps: number;
  author?: Author;
}

export interface PostFormProps {
  onSubmit: (
    title: string,
    content: string,
    images: File[],
    keepImages: string[]
  ) => void;
  initialTitle?: string;
  initialContent?: string;
  initialImages?: string[];
}

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  images: string[];
}

export interface Author {
  id: string;
  nickname: string;
  profileImg: string;
}

export type ApiError = {
  message: string;
};
