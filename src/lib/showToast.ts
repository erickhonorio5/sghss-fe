import toast from "react-hot-toast";

export const showToast = {
    success: (message: string) => toast.success(message, {
        style: {
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            backdropFilter: 'blur(8px)',
        },
        iconTheme: {
            primary: 'var(--color-primary)',
            secondary: 'white',
        },
        duration: 4000,
    }),

    error: (message: string) => toast.error(message, {
        style: {
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(239, 68, 68, 0.12)',
            backdropFilter: 'blur(8px)',
        },
        iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
        },
        duration: 4000,
    }),
};