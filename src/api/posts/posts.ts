import { Post } from "../../app/posts/types";

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function deletePost(id: string): Promise<{ message: string }> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("게시글을 삭제하는데 실패했습니다.");
  }
  return response.json();
}
