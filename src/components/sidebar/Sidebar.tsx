"use client";

import { SidebarItem } from "./SidebarItem";
import {
    CalendarCheck,
    LayoutDashboard,
    Users,
    Stethoscope,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebarStore  } from "@/stores/sidebar-store";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    const { isExpanded, isMobile, isMobileOpen, closeMobileSidebar } = useSidebarStore();

    const sidebarContent = (
        <aside
            className={cn(
                "fixed left-0 top-0 z-50 flex flex-col gap-2 border-r border-border p-4 min-h-screen transition-all duration-300",
                "dark:bg-black dark:text-white",
                "bg-white text-gray-900",
                isExpanded ? "w-64" : "w-20 items-center"
            )}
        >
            {/* Logo / Nome */}
            <div className="mb-6 font-bold text-2xl">
                {isExpanded ? "SGHSS" : "S"}
            </div>

            {/* Sidebar Items */}
            <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" />
            <SidebarItem
                icon={Users}
                label="Pacientes"
                submenu={[
                    { label: "Lista", href: "/pacientes" },
                    { label: "Novo", href: "/pacientes/novo" },
                ]}
            />
            <SidebarItem
                icon={CalendarCheck}
                label="Agendamentos"
                submenu={[
                    { label: "Agenda", href: "/agendamentos" },
                    { label: "Novo", href: "/agendamentos/novo" },
                ]}
            />
            <SidebarItem
                icon={Stethoscope}
                label="Profissionais"
                submenu={[
                    { label: "Lista", href: "/profissionais" },
                    { label: "Novo", href: "/profissionais/novo" },
                ]}
            />
        </aside>
    );

    return (
        <>
            {isMobile ? (
                <Sheet open={isMobileOpen} onOpenChange={closeMobileSidebar}>
                    <SheetContent
                        side="left"
                        className="p-0 w-64 dark:bg-black bg-white"
                    >
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
            ) : (
                sidebarContent
            )}
        </>
    );
};