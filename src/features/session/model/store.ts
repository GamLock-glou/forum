import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TUser } from '@/entities/user';

interface SessionState {
  isAuthenticated: boolean;
  currentUser: TUser | null;
  
  login: (user: TUser) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<TUser>) => void;
  
  isAdmin: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentUser: null,
      
      login: (user) => set({ 
        isAuthenticated: true, 
        currentUser: user 
      }),
      
      logout: () => set({ 
        isAuthenticated: false, 
        currentUser: null 
      }),
      
      updateCurrentUser: (updates) => set((state) => ({
        currentUser: state.currentUser 
          ? { ...state.currentUser, ...updates }
          : null,
      })),
      
      isAdmin: () => {
        const { currentUser } = get();
        return currentUser?.isAdmin === true;
      },
    }),
    {
      name: 'session-storage',
    }
  )
);