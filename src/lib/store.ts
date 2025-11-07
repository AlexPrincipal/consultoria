import { create } from 'zustand';

type AdminState = {
  isEditMode: boolean;
  toggleEditMode: () => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
