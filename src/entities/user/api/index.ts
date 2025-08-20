import { api, endpoints } from '@/shared/api';
import type { TUser } from '../model/types';
import type { UsersApiResponse, UserApiResponse } from '@/shared/lib/api-types';

export const usersApi = {
  getAll: (): UsersApiResponse => api.get<TUser[]>(endpoints.users),
  getById: (id: number): UserApiResponse => api.get<TUser>(`${endpoints.users}/${id}`),
  update: (id: number, data: Partial<TUser>): UserApiResponse => 
    api.put<TUser>(`${endpoints.users}/${id}`, data),
};