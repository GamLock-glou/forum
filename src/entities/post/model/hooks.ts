import { useCallback } from 'react';
import { usePostStore } from './store';
import { postSelectors } from './selectors';
export const usePostsData = () => {
  return usePostStore(postSelectors.posts);
};

export const usePostsLoading = () => {
  return usePostStore(postSelectors.loading);
};

export const usePostsError = () => {
  return usePostStore(postSelectors.error);
};

export const useFilteredPosts = () => {
  return usePostStore(postSelectors.filteredPosts);
};

export const useFavoritePosts = () => {
  return usePostStore(postSelectors.favoritePosts);
};

export const useSortedPosts = () => {
  return usePostStore(postSelectors.sortedPosts);
};

export const usePostsStats = () => {
  return usePostStore(postSelectors.postsStats);
};

export const useSelectedUserId = () => {
  return usePostStore(postSelectors.selectedUserId);
};
export const usePostActions = () => {
  const toggleLike = usePostStore(state => state.toggleLike);
  const toggleDislike = usePostStore(state => state.toggleDislike);
  const toggleFavorite = usePostStore(state => state.toggleFavorite);
  const deletePost = usePostStore(state => state.deletePost);
  const updatePost = usePostStore(state => state.updatePost);
  const addPost = usePostStore(state => state.addPost);
  const setSelectedUserId = usePostStore(state => state.setSelectedUserId);

  return {
    toggleLike: useCallback(toggleLike, [toggleLike]),
    toggleDislike: useCallback(toggleDislike, [toggleDislike]),
    toggleFavorite: useCallback(toggleFavorite, [toggleFavorite]),
    deletePost: useCallback(deletePost, [deletePost]),
    updatePost: useCallback(updatePost, [updatePost]),
    addPost: useCallback(addPost, [addPost]),
    setSelectedUserId: useCallback(setSelectedUserId, [setSelectedUserId]),
  };
};