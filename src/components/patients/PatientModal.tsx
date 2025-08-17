import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PatientForm } from "./PatientForm";
import { cn } from "@/lib/utils";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PatientModal({ isOpen, onClose, onSuccess }: PatientModalProps) {
  // Estado para controlar a animação de saída
  const [isClosing, setIsClosing] = useState(false);

  // Função para fechar a modal com animação
  const handleClose = () => {
    setIsClosing(true);
    // Espera a animação terminar antes de fechar a modal
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // 300ms é a duração da animação
  };

  // Se a modal não estiver aberta, não renderiza nada
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        {/* Overlay com blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
          className={cn(
            "relative z-50 w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg bg-white dark:bg-gray-900 shadow-lg",
            "p-6 sm:p-8",
            isClosing ? "animate-out fade-out zoom-out" : ""
          )}
        >
          {/* Cabeçalho da modal */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Cadastrar Novo Paciente
            </h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Fechar</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="h-px bg-gray-200 dark:bg-gray-800 mb-6" />

          {/* Conteúdo da modal */}
          <div className="overflow-y-auto">
            <PatientForm
              onSuccess={() => {
                if (onSuccess) onSuccess();
                handleClose();
              }}
              onCancel={handleClose}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
