'use client';

import { toast, Toast as ToastType } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

type ToastProps = {
  t: ToastType;
  type: 'success' | 'error';
  title: string;
  description?: string;
};

const Toast = ({ t, type, title, description }: ToastProps) => {
  return (
      <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          className={`flex items-start gap-2 rounded-md p-3 text-sm shadow-md border max-w-xs
        ${type === 'success'
              ? 'bg-green-50 text-green-800 border-green-100 dark:bg-green-900 dark:text-green-50 dark:border-green-800'
              : 'bg-red-50 text-red-800 border-red-100 dark:bg-red-900 dark:text-red-50 dark:border-red-800'}
      `}
      >
        <div className="mt-0.5 flex-shrink-0">
          {type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
          ) : (
              <AlertCircle className="h-4 w-4" />
          )}
        </div>

        <div className="flex-1">
          <p className="font-medium">{title}</p>
          {description && (
              <p className="mt-1 text-xs opacity-80">{description}</p>
          )}
        </div>

        <button
            onClick={() => toast.dismiss(t.id)}
            className="text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Fechar notificação"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
  );
};

export const showToast = {
  success: (title: string, description?: string) => {
    return toast.custom(
        (t) => <Toast t={t} type="success" title={title} description={description} />,
        {
          duration: 3000,
          position: 'top-right',
        }
    );
  },
  error: (title: string, description?: string) => {
    return toast.custom(
        (t) => <Toast t={t} type="error" title={title} description={description} />,
        {
          duration: 3000,
          position: 'top-right',
        }
    );
  },
  dismiss: toast.dismiss,
};