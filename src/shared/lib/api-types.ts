import type { AxiosResponse } from 'axios';
import type { TUser } from '@/entities/user';
import type { TPost } from '@/entities/post';
import type { TComment } from '@/entities/comment';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export type UsersApiResponse = ApiResponse<TUser[]>;
export type UserApiResponse = ApiResponse<TUser>;
export type PostsApiResponse = ApiResponse<TPost[]>;
export type PostApiResponse = ApiResponse<TPost>;
export type CommentsApiResponse = ApiResponse<TComment[]>;
export type CommentApiResponse = ApiResponse<TComment>;
export type DeleteApiResponse = ApiResponse<void>;