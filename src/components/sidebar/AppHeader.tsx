"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { NotificationDropdown } from "@/components/sidebar/NotificationDropdown";
import { UserDropdown } from "@/components/sidebar/UserDropdown";
import { Menu, Search, X } from "lucide-react";
import { useSidebarStore} from "@/stores/sidebar-store";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarSelector = (state: {
    isMobileOpen: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
}) => ({
    isMobileOpen: state.isMobileOpen,
    toggleSidebar: state.toggleSidebar,
    toggleMobileSidebar: state.toggleMobileSidebar,
});

export default function AppHeader() {
    const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const toggleMobileSidebar = useSidebarStore((state) => state.toggleMobileSidebar);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleToggle = () => {
        if (isClient && window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    return (
        <motion.header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 lg:py-4 lg:px-6">
                {/* Left Section */}
                <div className="flex w-full items-center justify-between gap-2 lg:gap-4 lg:justify-normal">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:flex border rounded-lg"
                            onClick={handleToggle}
                            aria-label="Toggle sidebar"
                        >
                            {isMobileOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Link href="/" className="lg:hidden" aria-label="Home">
                            <Image
                                width={154}
                                height={32}
                                className="dark:hidden"
                                src="/images/logo/logo.svg"
                                alt="Logo"
                                priority
                            />
                            <Image
                                width={154}
                                height={32}
                                className="hidden dark:block"
                                src="/images/logo/logo-dark.svg"
                                alt="Logo"
                                priority
                            />
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
                            aria-label="Toggle app menu"
                        >
                            <Search className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    <div className="hidden lg:block">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-8 w-40 focus:w-60 transition-all duration-300"
                                ref={inputRef}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Right Section */}
                <AnimatePresence>
                    {(isAppMenuOpen || (isClient && window.innerWidth >= 1024)) && (
                        <motion.div
                            className={`mt-4 w-full items-center justify-between gap-4 lg:mt-0 lg:flex lg:w-auto`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <ThemeToggleButton />
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <NotificationDropdown />
                                </motion.div>
                            </div>
                            <motion.div whileHover={{ scale: 1.03 }}>
                                <UserDropdown />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}