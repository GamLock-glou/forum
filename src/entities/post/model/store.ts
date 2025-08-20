import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TPost, TPostWithInteractions } from './types';

export interface PostState {
  posts: TPostWithInteractions[];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
  favorites: number[];
  likedPosts: number[];
  dislikedPosts: number[];
  
  setPosts: (posts: TPost[]) => void;
  addPost: (post: TPost) => void;
  updatePost: (postId: number, updates: Partial<TPost>) => void;
  deletePost: (postId: number) => void;
  
  toggleLike: (postId: number) => void;
  toggleDislike: (postId: number) => void;
  toggleFavorite: (postId: number) => void;
  
  setSelectedUserId: (userId: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  getFilteredPosts: () => TPostWithInteractions[];
  getFavoritePosts: () => TPostWithInteractions[];
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,
      selectedUserId: null,
      favorites: [],
      likedPosts: [],
      dislikedPosts: [],
      
      setPosts: (posts) => {
        const { favorites, likedPosts, dislikedPosts } = get();
        const postsWithInteractions: TPostWithInteractions[] = posts.map(post => ({
          ...post,
          likes: post.likes || 0,
          dislikes: post.dislikes || 0,
          isLiked: likedPosts.includes(post.id),
          isDisliked: dislikedPosts.includes(post.id),
          isFavorite: favorites.includes(post.id),
        }));
        set({ posts: postsWithInteractions });
      },
      
      addPost: (post) => set((state) => {
        const newPost: TPostWithInteractions = {
          ...post,
          likes: 0,
          dislikes: 0,
          isLiked: false,
          isDisliked: false,
          isFavorite: false,
        };
        return { posts: [newPost, ...state.posts] };
      }),
      
      updatePost: (postId, updates) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId ? { ...post, ...updates } : post
        ),
      })),
      
      deletePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId),
        favorites: state.favorites.filter(id => id !== postId),
        likedPosts: state.likedPosts.filter(id => id !== postId),
        dislikedPosts: state.dislikedPosts.filter(id => id !== postId),
      })),
      
      toggleLike: (postId) => set((state) => {
        const isLiked = state.likedPosts.includes(postId);
        const isDisliked = state.dislikedPosts.includes(postId);
        
        const newLikedPosts = isLiked 
          ? state.likedPosts.filter(id => id !== postId)
          : [...state.likedPosts, postId];
          
        const newDislikedPosts = isDisliked 
          ? state.dislikedPosts.filter(id => id !== postId)
          : state.dislikedPosts;
          
        const newPosts = state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: isLiked ? (post.likes || 1) - 1 : (post.likes || 0) + 1,
              dislikes: isDisliked ? (post.dislikes || 1) - 1 : post.dislikes,
              isLiked: !isLiked,
              isDisliked: false,
            };
          }
          return post;
        });
        
        return {
          likedPosts: newLikedPosts,
          dislikedPosts: newDislikedPosts,
          posts: newPosts,
        };
      }),
      
      toggleDislike: (postId) => set((state) => {
        const isLiked = state.likedPosts.includes(postId);
        const isDisliked = state.dislikedPosts.includes(postId);
        
        const newDislikedPosts = isDisliked 
          ? state.dislikedPosts.filter(id => id !== postId)
          : [...state.dislikedPosts, postId];
          
        const newLikedPosts = isLiked 
          ? state.likedPosts.filter(id => id !== postId)
          : state.likedPosts;
          
        const newPosts = state.posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: isLiked ? (post.likes || 1) - 1 : post.likes,
              dislikes: isDisliked ? (post.dislikes || 1) - 1 : (post.dislikes || 0) + 1,
              isLiked: false,
              isDisliked: !isDisliked,
            };
          }
          return post;
        });
        
        return {
          likedPosts: newLikedPosts,
          dislikedPosts: newDislikedPosts,
          posts: newPosts,
        };
      }),
      
      toggleFavorite: (postId) => set((state) => {
        const isFavorite = state.favorites.includes(postId);
        const newFavorites = isFavorite 
          ? state.favorites.filter(id => id !== postId)
          : [...state.favorites, postId];
          
        const newPosts = state.posts.map(post => {
          if (post.id === postId) {
            return { ...post, isFavorite: !isFavorite };
          }
          return post;
        });
        
        return {
          favorites: newFavorites,
          posts: newPosts,
        };
      }),
      
      setSelectedUserId: (userId) => set({ selectedUserId: userId }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      getFilteredPosts: () => {
        const { posts, selectedUserId } = get();
        if (!selectedUserId) return posts;
        return posts.filter(post => post.userId === selectedUserId);
      },
      
      getFavoritePosts: () => {
        const { posts } = get();
        return posts.filter(post => post.isFavorite);
      },
    }),
    {
      name: 'post-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        likedPosts: state.likedPosts,
        dislikedPosts: state.dislikedPosts,
      }),
    }
  )
);