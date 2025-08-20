import type { PostState } from './store';
import type { TPostWithInteractions } from './types';

export const postSelectors = {
  posts: (state: PostState) => state.posts,
  loading: (state: PostState) => state.loading,
  error: (state: PostState) => state.error,
  selectedUserId: (state: PostState) => state.selectedUserId,
  favorites: (state: PostState) => state.favorites,
  likedPosts: (state: PostState) => state.likedPosts,
  dislikedPosts: (state: PostState) => state.dislikedPosts,
  
  filteredPosts: (state: PostState) => {
    const { posts, selectedUserId } = state;
    if (!selectedUserId) return posts;
    return posts.filter((post: TPostWithInteractions) => post.userId === selectedUserId);
  },
  
  favoritePosts: (state: PostState) => {
    return state.posts.filter((post: TPostWithInteractions) => post.isFavorite);
  },
  
  sortedPosts: (state: PostState) => {
    return [...state.posts].sort((a: TPostWithInteractions, b: TPostWithInteractions) => (b.priority || 0) - (a.priority || 0));
  },
  
  postsStats: (state: PostState) => ({
    total: state.posts.length,
    favorites: state.favorites.length,
    withPriority: state.posts.filter((post: TPostWithInteractions) => (post.priority || 0) > 0).length,
    totalLikes: state.posts.reduce((sum: number, post: TPostWithInteractions) => sum + (post.likes || 0), 0),
    totalDislikes: state.posts.reduce((sum: number, post: TPostWithInteractions) => sum + (post.dislikes || 0), 0),
  }),
};