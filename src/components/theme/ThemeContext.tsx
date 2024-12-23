import React, { createContext, useContext, useState } from 'react';
import TThemes from '../../types/themes.type';



interface ThemeContextProps {
    theme: TThemes;
    toggleTheme: (newTheme: TThemes) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<TThemes>('dark');

    const toggleTheme = (newTheme: TThemes) => {
        setTheme((prev) => newTheme);
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
