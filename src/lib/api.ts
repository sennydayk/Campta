import { Post } from "./posts/types";

export async function fetchPosts(page = 1, limit = 10): Promise<Post[]> {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
