import { api, endpoints } from '@/shared/api';
import type { TPost } from '../model/types';
import type { PostsApiResponse, PostApiResponse, DeleteApiResponse } from '@/shared/lib/api-types';

export const postsApi = {
  getAll: (): PostsApiResponse => api.get<TPost[]>(endpoints.posts),
  getById: (id: number): PostApiResponse => api.get<TPost>(`${endpoints.posts}/${id}`),
  getByUserId: (userId: number): PostsApiResponse => 
    api.get<TPost[]>(`${endpoints.posts}?userId=${userId}`),
  create: (data: Omit<TPost, 'id'>): PostApiResponse => api.post<TPost>(endpoints.posts, data),
  update: (id: number, data: Partial<TPost>): PostApiResponse => 
    api.put<TPost>(`${endpoints.posts}/${id}`, data),
  delete: (id: number): DeleteApiResponse => api.delete(`${endpoints.posts}/${id}`),
};