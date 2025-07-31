"use client";

import { useNotificationStore } from "@/stores/notificationStore";
import { Bell, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    id: number;
    userName: string;
    message: string;
    project: string;
    time: string;
    imageSrc: string;
    statusColor: string;
}

const notifications: Notification[] = [
    {
        id: 1,
        userName: "Terry Franci",
        message: "requests permission to change",
        project: "Project - Nganter App",
        time: "5 min ago",
        imageSrc: "/images/user/user-02.jpg",
        statusColor: "bg-success-500",
    },
    {
        id: 2,
        userName: "Alena Franci",
        message: "requests permission to change",
        project: "Project - Nganter App",
        time: "8 min ago",
        imageSrc: "/images/user/user-03.jpg",
        statusColor: "bg-success-500",
    },
    // ...outros
];

export function NotificationDropdown() {
    const { isOpen, toggleDropdown, closeDropdown, notifying, setNotifying } =
        useNotificationStore();

    function handleClick() {
        toggleDropdown();
        if (notifying) setNotifying(false);
    }

    return (
        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <motion.button
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Notifications"
                onClick={handleClick}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                whileTap={{ scale: 0.95 }}
            >
                {notifying && (
                    <motion.span
                        className="absolute right-0 top-1 z-10 flex h-2 w-2 items-center justify-center rounded-full bg-orange-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                    >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                    </motion.span>
                )}
                <Bell className="h-5 w-5" aria-hidden="true" />
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
                            className="absolute right-0 mt-2 flex h-[480px] w-[350px] flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-700 dark:bg-gray-900 sm:w-[361px]"
                            role="menu"
                            aria-label="Notification List"
                        >
                            <motion.header
                                className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3 dark:border-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Notifications
                                </h5>
                                <motion.button
                                    onClick={closeDropdown}
                                    aria-label="Close notifications"
                                    className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="h-6 w-6" />
                                </motion.button>
                            </motion.header>

                            <ul className="flex flex-col overflow-y-auto custom-scrollbar">
                                {notifications.map((note, index) => (
                                    <motion.li
                                        key={note.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <DropdownItem
                                            onItemClick={closeDropdown}
                                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                                        >
                                            <motion.span
                                                className="relative block max-w-[40px] rounded-full"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Image
                                                    src={note.imageSrc}
                                                    alt={`User ${note.userName}`}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                                <span
                                                    className={`absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white ${note.statusColor} dark:border-gray-900`}
                                                />
                                            </motion.span>

                                            <motion.div
                                                className="flex flex-col"
                                                whileHover={{ x: 3 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <p className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                                        {note.userName}
                                                    </span>{" "}
                                                    {note.message}{" "}
                                                    <span className="font-medium text-gray-800 dark:text-gray-100">
                                                        {note.project}
                                                    </span>
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>Project</span>
                                                    <span className="inline-block h-1 w-1 rounded-full bg-gray-400" />
                                                    <span>{note.time}</span>
                                                </div>
                                            </motion.div>
                                        </DropdownItem>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/"
                                    className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    View All Notifications
                                </Link>
                            </motion.div>
                        </Dropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}