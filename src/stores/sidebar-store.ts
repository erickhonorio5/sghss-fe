import { create } from "zustand";

type SidebarState = {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    activeItem: string | null;
    openSubmenu: string | null;
    isMobile: boolean;
};

type SidebarActions = {
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setIsHovered: (value: boolean) => void;
    setActiveItem: (item: string | null) => void;
    toggleSubmenu: (item: string) => void;
    setIsMobile: (value: boolean) => void;
    closeMobileSidebar: () => void;
};

export const useSidebarStore = create<SidebarState & SidebarActions>((set) => ({
    isExpanded: true,
    isMobileOpen: false,
    isHovered: false,
    activeItem: null,
    openSubmenu: null,
    isMobile: false,

    toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    toggleMobileSidebar: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    closeMobileSidebar: () => set({ isMobileOpen: false }),
    setIsHovered: (value) => set({ isHovered: value }),
    setActiveItem: (item) => set({ activeItem: item }),
    toggleSubmenu: (item) =>
        set((state) => ({
            openSubmenu: state.openSubmenu === item ? null : item,
        })),
    setIsMobile: (value) => set({ isMobile: value }),
}));
