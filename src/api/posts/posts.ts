import { Post } from "@/lib/posts/types";
import { useAuthStore } from "@/store/auth/authStore";

export async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (!response.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function createPost(postData: FormData) {
  try {
    const authStore = useAuthStore.getState();
    if (!authStore.isLogin) {
      throw new Error("로그인이 필요합니다.");
    }

    const token = await authStore.getIdToken();
    if (!token) {
      throw new Error("인증 토큰을 가져올 수 없습니다.");
    }

    console.log("Client-side token:", token); // 디버깅용
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const authStore = useAuthStore.getState();
  if (!authStore.user) {
    throw new Error("로그인이 필요합니다.");
  }

  const token = await authStore.getIdToken();
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const authStore = useAuthStore.getState();
  if (!authStore.user) {
    throw new Error("로그인이 필요합니다.");
  }

  const token = await authStore.getIdToken();
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시글을 수정하는데 실패했습니다.");
  }
  return response.json();
}
