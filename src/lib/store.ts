
import { create } from 'zustand';

export interface AppState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));
