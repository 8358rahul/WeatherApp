import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    header: string;
  };
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#3F51B5',
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
      header: "#f5f5f5",

  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#7986CB',
    background: '#121212',
    card: '#1E1E1E',
    text: '#E0E0E0',
    textSecondary: '#9E9E9E',
    border: '#424242',
      header: "#1a1a1a",

  },
};

const ThemeContext = createContext({
  colors: lightTheme.colors,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ colors: theme.colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);