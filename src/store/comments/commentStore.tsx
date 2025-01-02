import { create } from "zustand";
import { CommentStore } from "./types";

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  updateComment: (id, content) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === id ? { ...c, content } : c
      ),
    })),
  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
    })),
}));
