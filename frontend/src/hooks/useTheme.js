import { useState, useEffect } from 'react';

export const useTheme = () => {
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('adminTheme');
        return savedTheme || 'light';
    });

    // Persist theme changes to localStorage
    useEffect(() => {
        localStorage.setItem('adminTheme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Theme configuration
    const themeConfig = {
        light: {
            background: '#f8fafc',
            cardBg: '#ffffff',
            textPrimary: '#1e293b',
            textSecondary: '#64748b',
            border: '#e2e8f0',
            inputBg: '#ffffff',
            inputBorder: '#cbd5e1',
            shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        dark: {
            background: '#0f172a',
            cardBg: '#1e293b',
            textPrimary: '#f1f5f9',
            textSecondary: '#94a3b8',
            border: '#334155',
            inputBg: '#334155',
            inputBorder: '#475569',
            shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
            shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        },
    };

    return {
        theme,
        toggleTheme,
        colors: themeConfig[theme],
        isDark: theme === 'dark',
    };
};
