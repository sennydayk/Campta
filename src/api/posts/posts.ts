import { Post } from "@/lib/posts/types";

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function createPost(postData: FormData) {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: postData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error(errorData.error || "게시글 등록에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("Post creation error:", error);
    throw new Error(
      "게시글 등록 중 오류가 발생했습니다: " + (error as Error).message
    );
  }
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

export async function updatePost(
  id: string,
  formData: FormData
): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시글을 수정하는데 실패했습니다.");
  }
  return response.json();
}
