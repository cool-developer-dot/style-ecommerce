'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#000000';
      body.style.backgroundColor = '#000000';
      root.style.color = '#ffffff';
      body.style.color = '#ffffff';
      
      // Force all text elements to be white in dark mode
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const el = element as HTMLElement;
        if (!el.classList.contains('text-blue-600') && 
            !el.classList.contains('text-indigo-600') && 
            !el.classList.contains('text-purple-600') &&
            !el.classList.contains('text-green-500') &&
            !el.classList.contains('text-red-500') &&
            !el.classList.contains('text-orange-500') &&
            !el.classList.contains('text-yellow-400') &&
            !el.classList.contains('bg-gradient-to-r') &&
            !el.classList.contains('bg-gradient-to-br')) {
          el.style.color = '#ffffff';
        }
      });
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#ffffff';
      body.style.backgroundColor = '#ffffff';
      root.style.color = '#171717';
      body.style.color = '#171717';
      
      // Reset text colors in light mode
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const el = element as HTMLElement;
        el.style.color = '';
      });
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      <div 
        className={`min-h-screen transition-all duration-300 ${theme === 'dark' ? 'dark' : ''}`}
        style={{
          backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values if context is not available
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      mounted: false
    };
  }
  return context;
} 