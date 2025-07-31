import { create } from "zustand";

interface NotificationState {
    isOpen: boolean;
    notifying: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    setNotifying: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    isOpen: false,
    notifying: true,
    toggleDropdown: () =>
        set((state) => ({ isOpen: !state.isOpen, notifying: false })),
    closeDropdown: () => set({ isOpen: false }),
    setNotifying: (value) => set({ notifying: value }),
}));