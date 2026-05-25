import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme-context';

type ThemeProviderProps = {
  children: ReactNode;
};

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem('theme');

  return storedTheme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
