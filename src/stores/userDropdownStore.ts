import { create } from "zustand";

interface UserDropdownState {
    isOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
}

export const useUserDropdownStore = create<UserDropdownState>((set) => ({
    isOpen: false,
    toggleDropdown: () =>
        set((state) => ({ isOpen: !state.isOpen })),
    closeDropdown: () => set({ isOpen: false }),
}));
