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
    try {
      const response = await fetch(
        `${API_URL}?postId=${postId}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch comments");
      }
      const data = await response.json();
      return {
        comments: data.comments,
        hasNextPage: data.hasNextPage,
        nextPage: data.nextPage,
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

  addComment: async (
    comment: Omit<CommentProps, "id" | "timestamp" | "replies">
  ): Promise<CommentProps> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add comment");
      }
      return response.json();
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  updateComment: async (id: string, content: string): Promise<void> => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, content }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },

  deleteComment: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
};
