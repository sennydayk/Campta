export interface NewPostFormProps {
  onSubmit: (title: string, content: string, images: File[]) => void;
}

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  images: string[];
}
