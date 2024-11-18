import { CommentProps } from "@/lib/comments/types";

const API_URL = "/api/comments";

export interface CommentApiResponse {
  comments: CommentProps[];
  hasNextPage: boolean;
  nextPage: number | null;
}

export const commentApi = {
  getComments: async (
    postId: string,
    page: number = 0,
    limit: number = 10
  ): Promise<CommentApiResponse> => {
    const response = await fetch(
      `${API_URL}?postId=${postId}&page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    return {
      comments: data.comments,
      hasNextPage: data.hasNextPage,
      nextPage: data.nextPage,
    };
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
