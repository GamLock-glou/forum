import type { TPost } from './TPost';

export type TPostWithInteractions = TPost & {
  isLiked: boolean;
  isDisliked: boolean;
  isFavorite: boolean;
};