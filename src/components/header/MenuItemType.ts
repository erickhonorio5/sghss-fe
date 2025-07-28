export type MenuItemType = {
    id: number;
    title: string;
    newTab?: boolean;
    path: string;
    submenu?: MenuItemType[];
    isAuthAction?: boolean;
    isPrimary?: boolean;
    mobileOnly?: boolean;
};

export type HeaderVariant = 'transparent' | 'solid';