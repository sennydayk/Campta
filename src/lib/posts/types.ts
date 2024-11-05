export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  comments: number;
  scraps: number;
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

export type ApiError = {
  message: string;
};
