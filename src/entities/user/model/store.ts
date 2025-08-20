import { create } from 'zustand';
import type { TUser } from './types';

interface UserState {
  users: TUser[];
  currentUser: TUser | null;
  loading: boolean;
  error: string | null;
  
  setUsers: (users: TUser[]) => void;
  setCurrentUser: (user: TUser | null) => void;
  updateUser: (userId: number, updates: Partial<TUser>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  
  setUsers: (users) => set({ users }),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  updateUser: (userId, updates) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ),
    currentUser: state.currentUser?.id === userId 
      ? { ...state.currentUser, ...updates } 
      : state.currentUser,
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));