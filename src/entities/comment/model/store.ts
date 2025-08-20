import { create } from 'zustand';
import type { TComment } from './types';

interface CommentState {
  comments: TComment[];
  loading: boolean;
  error: string | null;
  
  setComments: (comments: TComment[]) => void;
  addComment: (comment: TComment) => void;
  deleteComment: (commentId: number) => void;
  getCommentsByPostId: (postId: number) => TComment[];
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  loading: false,
  error: null,
  
  setComments: (comments) => set({ comments }),
  
  addComment: (comment) => set((state) => ({
    comments: [...state.comments, comment],
  })),
  
  deleteComment: (commentId) => set((state) => ({
    comments: state.comments.filter(comment => comment.id !== commentId),
  })),
  
  getCommentsByPostId: (postId) => {
    const { comments } = get();
    return comments.filter(comment => comment.postId === postId);
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));