import { Post } from "./posts/types";

export const POSTS_PER_PAGE = 9;

export async function fetchPosts(page: number): Promise<Post[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(
    `${API_URL}/api/posts?page=${page}&limit=${POSTS_PER_PAGE}&sort=createdAt&order=desc`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
