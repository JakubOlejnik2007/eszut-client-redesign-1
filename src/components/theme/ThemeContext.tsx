import React, { createContext, useContext, useEffect, useState } from 'react';
import TThemes from '../../types/themes.type';



interface ThemeContextProps {
    theme: TThemes;
    toggleTheme: (newTheme: TThemes) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<TThemes>('dark');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme') as TThemes;
        if (localTheme) {
            setTheme(localTheme);
        }
    })

    const toggleTheme = (newTheme: TThemes) => {
        setTheme((prev) => newTheme);
        localStorage.setItem('theme', newTheme);

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
