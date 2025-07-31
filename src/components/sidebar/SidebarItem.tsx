"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { motion, AnimatePresence } from "framer-motion";

type SidebarItemProps = {
    icon: React.ElementType;
    label: string;
    href?: string;
    submenu?: { label: string; href: string }[];
};

export const SidebarItem = ({ icon: Icon, label, href, submenu }: SidebarItemProps) => {
    const pathname = usePathname();
    const { isExpanded, closeMobileSidebar } = useSidebarStore();

    const isActive = href
        ? pathname.startsWith(href)
        : submenu?.some(item => pathname.startsWith(item.href));

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            {href ? (
                <Link
                    href={href}
                    onClick={closeMobileSidebar}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        "dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20",
                        "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
                        isActive && "dark:bg-white/10 dark:font-semibold",
                        isActive && "bg-gray-100 font-semibold"
                    )}
                >
                    <Icon size={20} />
                    {isExpanded && <span>{label}</span>}
                </Link>
            ) : (
                <details className="group">
                    <summary
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                            "dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20",
                            "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
                            isActive && "dark:bg-white/10 dark:font-semibold",
                            isActive && "bg-gray-100 font-semibold"
                        )}
                    >
                        <Icon size={20} />
                        {isExpanded && <span className="flex-1">{label}</span>}
                        {isExpanded && (
                            <motion.span
                                initial={false}
                                animate={{ rotate: 0 }}
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight
                                    className="transition-transform group-open:rotate-90"
                                    size={16}
                                />
                            </motion.span>
                        )}
                    </summary>

                    <AnimatePresence initial={false}>
                        {submenu && (
                            <motion.ul
                                className={cn("ml-8 mt-2 flex flex-col gap-1", isExpanded ? "block" : "hidden")}
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                    open: {
                                        opacity: 1,
                                        height: "auto",
                                        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                                    },
                                    collapsed: {
                                        opacity: 0,
                                        height: 0,
                                        transition: { duration: 0.15 },
                                    },
                                }}
                            >
                                {submenu.map(({ label, href }) => {
                                    const isSubActive = pathname === href;
                                    return (
                                        <motion.li
                                            key={href}
                                            variants={{
                                                open: { opacity: 1, y: 0 },
                                                collapsed: { opacity: 0, y: -5 },
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link
                                                href={href}
                                                onClick={closeMobileSidebar}
                                                className={cn(
                                                    "block text-sm px-2 py-1 rounded-md transition-colors",
                                                    "dark:text-white/80 dark:hover:bg-white/10",
                                                    "text-gray-600 hover:bg-gray-100",
                                                    isSubActive && "dark:bg-white/10 dark:font-medium",
                                                    isSubActive && "bg-gray-100 font-medium"
                                                )}
                                            >
                                                {label}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </details>
            )}
        </motion.div>
    );
};