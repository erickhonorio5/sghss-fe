'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {useEffect, useState} from "react";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Alternar tema"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
};

