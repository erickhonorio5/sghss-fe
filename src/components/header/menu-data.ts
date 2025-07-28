import { MenuItemType } from './MenuItemType';

export const menuData: MenuItemType[] = [
    {
        id: 1,
        title: "Início",
        path: "/",
    },
    {
        id: 2,
        title: "Serviços",
        path: "/#services",
    },
    {
        id: 3,
        title: "Sobre",
        path: "/about",
    },
    {
        id: 4,
        title: "Contato",
        path: "/contact",
    },
    {
        id: 5,
        title: "Entrar",
        path: "/auth/signin",
        isAuthAction: true,
        mobileOnly: true
    },
    {
        id: 6,
        title: "Cadastre-se",
        path: "/auth/signup",
        isAuthAction: true,
        isPrimary: true,
        mobileOnly: true
    }
];