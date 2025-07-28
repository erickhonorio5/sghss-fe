'use client';

import { useState, useEffect } from 'react';

export const useScrollEffect = (threshold = 0): boolean => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
};