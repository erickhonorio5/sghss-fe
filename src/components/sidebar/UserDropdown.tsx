"use client";

import Link from "next/link";
import React from "react";
import { useUserDropdownStore } from "@/stores/userDropdownStore";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function UserDropdown() {
    const { isOpen, toggleDropdown, closeDropdown } = useUserDropdownStore();

    return (
        <motion.div className="relative" whileHover={{ scale: 1.03 }}>
            <motion.button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="User menu"
                className="flex items-center text-gray-700 dark:text-gray-400"
                whileTap={{ scale: 0.97 }}
            >
                <span className="mr-1 font-medium text-theme-sm dark:text-gray-300">
                    Erick
                </span>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown
                        className="stroke-gray-500 dark:stroke-gray-400"
                        aria-hidden="true"
                        width={18}
                        height={20}
                    />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Dropdown
                            isOpen={isOpen}
                            onClose={closeDropdown}
                            className="absolute right-0 mt-2 flex w-[260px] flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-700 dark:bg-gray-900"
                            role="menu"
                            aria-label="User menu dropdown"
                        >
                            <motion.div
                                className="mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-300">
                                    Erick Honorio
                                </span>
                                <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                                    teste@gmail.com
                                </span>
                            </motion.div>

                            <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                                <motion.li
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <DropdownItem
                                        onItemClick={closeDropdown}
                                        tag="a"
                                        href="/profile"
                                        className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    >
                                        <User className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
                                        Edit profile
                                    </DropdownItem>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <DropdownItem
                                        onItemClick={closeDropdown}
                                        tag="a"
                                        href="/profile"
                                        className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    >
                                        <Settings className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
                                        Account settings
                                    </DropdownItem>
                                </motion.li>
                                <motion.li
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <DropdownItem
                                        onItemClick={closeDropdown}
                                        tag="a"
                                        href="/profile"
                                        className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    >
                                        <HelpCircle className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300" />
                                        Support
                                    </DropdownItem>
                                </motion.li>
                            </ul>

                            <motion.div
                                whileHover={{ x: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href="/auth/signin"
                                    className="flex items-center gap-3 px-3 py-2 mt-3 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    role="menuitem"
                                >
                                    <LogOut className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300" />
                                    Sign out
                                </Link>
                            </motion.div>
                        </Dropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}