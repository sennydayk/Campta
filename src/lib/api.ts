import { Post } from "./posts/types";

export const POSTS_PER_PAGE = 9;

export async function fetchPosts(page: number): Promise<Post[]> {
  const response = await fetch(
    `http://localhost:3000/api/posts?page=${page}&limit=${POSTS_PER_PAGE}&sort=createdAt&order=desc`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}
