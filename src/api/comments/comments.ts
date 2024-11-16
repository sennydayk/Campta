import { CommentProps, UserProfile } from "@/lib/comments/types";

const API_URL = "/api/comments";

export const commentApi = {
  getComments: async (postId: string): Promise<CommentProps[]> => {
    const response = await fetch(`${API_URL}?postId=${postId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  },

  addComment: async (
    comment: Omit<CommentProps, "id" | "timestamp" | "replies">
  ): Promise<CommentProps> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
    return response.json();
  },

  updateComment: async (id: string, content: string): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, content }),
    });
    if (!response.ok) {
      throw new Error("Failed to update comment");
    }
  },

  deleteComment: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }
  },
};
