'use client';

import { useSidebarStore } from "@/stores/sidebar-store";
import { Sidebar } from "@/components/sidebar/Sidebar";
import AppHeader from "@/components/sidebar/AppHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const isExpanded = useSidebarStore((state) => state.isExpanded);
    const sidebarWidth = isExpanded ? 256 : 80;

    return (
        <div>
            <Sidebar />

            {/* Aplica padding apenas uma vez aqui */}
            <main
                style={{ paddingLeft: sidebarWidth }}
                className="transition-padding duration-300 ease-in-out min-h-screen overflow-x-hidden"
            >
                <AppHeader />
                {children}
            </main>
        </div>
    );
}