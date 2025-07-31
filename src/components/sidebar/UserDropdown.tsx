"use client";

import React from "react";
import { useUserDropdownStore } from "@/stores/userDropdownStore";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";
import { showToast } from "@/lib/showToast";

export function UserDropdown() {
  const { isOpen, toggleDropdown, closeDropdown } = useUserDropdownStore();
  const { data: user, isLoading } = useCurrentUser();
  const { performLogout, isPending } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await performLogout();
      closeDropdown();
      showToast.success(
        "Logout realizado!",
        "Você foi desconectado com sucesso"
      );
    } catch (error) {
      showToast.error(
        "Erro no logout",
        error instanceof Error
          ? error.message
          : "Não foi possível sair no momento"
      );
    }
  };

  return (
    <motion.div className="relative" whileHover={{ scale: 1.03 }}>
      <motion.button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Menu do usuário"
        className="flex items-center text-gray-700 dark:text-gray-400"
        whileTap={{ scale: 0.97 }}
      >
        {isLoading ? (
          <Skeleton className="w-20 h-4 mr-2 rounded" />
        ) : (
          <span className="mr-1 font-medium text-theme-sm dark:text-gray-300">
            {user?.username}
          </span>
        )}

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
              aria-label="Menu dropdown do usuário"
            >
              <motion.div
                className="mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {isLoading ? (
                  <div>
                    <Skeleton className="w-32 h-4 mb-1 rounded" />
                    <Skeleton className="w-44 h-3 rounded" />
                  </div>
                ) : (
                  <>
                    <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-300">
                      {user?.fullName}
                    </span>
                    <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </span>
                  </>
                )}
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
                    <User className="w-5 h-5" />
                    <span>Editar perfil</span>
                  </DropdownItem>
                </motion.li>

                <motion.li
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <DropdownItem
                    onItemClick={closeDropdown}
                    tag="a"
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Configurações</span>
                  </DropdownItem>
                </motion.li>

                <motion.li
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <DropdownItem
                    onItemClick={closeDropdown}
                    tag="a"
                    href="/support"
                    className="flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span>Suporte</span>
                  </DropdownItem>
                </motion.li>
              </ul>

              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="flex items-center gap-3 w-full px-3 py-2 mt-3 font-medium rounded-lg text-gray-700 text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isPending ? "Saindo..." : "Sair"}</span>
                </button>
              </motion.div>
            </Dropdown>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
