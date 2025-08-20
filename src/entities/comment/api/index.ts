import { api, endpoints } from '@/shared/api';
import type { TComment } from '../model/types';
import type { CommentsApiResponse, CommentApiResponse, DeleteApiResponse } from '@/shared/lib/api-types';

export const commentsApi = {
  getAll: (): CommentsApiResponse => api.get<TComment[]>(endpoints.comments),
  getByPostId: (postId: number): CommentsApiResponse => 
    api.get<TComment[]>(`${endpoints.comments}?postId=${postId}`),
  create: (data: Omit<TComment, 'id'>): CommentApiResponse => 
    api.post<TComment>(endpoints.comments, data),
  delete: (id: number): DeleteApiResponse => api.delete(`${endpoints.comments}/${id}`),
};