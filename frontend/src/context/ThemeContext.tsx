import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Mode, ColorTheme, BackgroundTheme } from '../types/theme';
import { themesConfig, type ThemeConfig } from '../config/themes';

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  recentlyUsed: string[];
  applyTheme: (theme: ThemeConfig) => void;
  toggleMode: () => void;
  timeThemeEnabled: boolean;
  setTimeThemeEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('mode') as Mode) || 'dark');
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => (localStorage.getItem('colorTheme') as ColorTheme) || 'violet');
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>(() => (localStorage.getItem('backgroundTheme') as BackgroundTheme) || 'none');
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('themeFavorites') || '[]'));
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => JSON.parse(localStorage.getItem('themeRecent') || '[]'));
  const [timeThemeEnabled, setTimeThemeEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('timeThemeEnabled') === 'true';
  });

  const setTimeThemeEnabled = (enabled: boolean) => {
    setTimeThemeEnabledState(enabled);
    localStorage.setItem('timeThemeEnabled', String(enabled));
  };

  const applyTimeBasedTheme = () => {
    const hour = new Date().getHours();
    let themeId = 'morning-warm';
    if (hour >= 5 && hour < 17) {
      themeId = 'morning-warm';
    } else if (hour >= 17 && hour < 20) {
      themeId = 'sunset';
    } else {
      themeId = 'midnight';
    }

    const targetTheme = themesConfig.find(t => t.id === themeId);
    if (targetTheme) {
      if (targetTheme.mode) setMode(targetTheme.mode);
      setColorTheme(targetTheme.colorTheme);
      setBackgroundTheme(targetTheme.backgroundTheme);
    }
  };

  // Dynamic Time-Based Theme Effect
  useEffect(() => {
    if (!timeThemeEnabled) return;

    // Apply immediately
    applyTimeBasedTheme();

    // Check time every minute
    const timer = setInterval(() => {
      applyTimeBasedTheme();
    }, 60000);

    return () => clearInterval(timer);
  }, [timeThemeEnabled]);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Handle Mode
    root.classList.remove('dark', 'light');
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
    localStorage.setItem('mode', mode);

    // Handle Color Theme
    const colorClasses = themesConfig.map(t => `theme-${t.colorTheme}`);
    root.classList.remove(...colorClasses);
    root.classList.add(`theme-${colorTheme}`);
    localStorage.setItem('colorTheme', colorTheme);

    // Handle Background Theme
    const bgClasses = ['bg-mesh', 'bg-grid', 'bg-dots', 'bg-stars', 'bg-circuit'];
    body.classList.remove(...bgClasses);
    if (backgroundTheme !== 'none') {
      body.classList.add(`bg-${backgroundTheme}`);
    }
    localStorage.setItem('backgroundTheme', backgroundTheme);
  }, [mode, colorTheme, backgroundTheme]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('themeFavorites', JSON.stringify(next));
      return next;
    });
  };

  // User manual overrides disable auto time-based theme
  const handleSetMode = (newMode: Mode) => {
    setTimeThemeEnabled(false);
    setMode(newMode);
  };

  const handleSetColorTheme = (newColorTheme: ColorTheme) => {
    setTimeThemeEnabled(false);
    setColorTheme(newColorTheme);
  };

  const handleSetBackgroundTheme = (newBackgroundTheme: BackgroundTheme) => {
    setTimeThemeEnabled(false);
    setBackgroundTheme(newBackgroundTheme);
  };

  const handleToggleMode = () => {
    setTimeThemeEnabled(false);
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const applyTheme = (theme: ThemeConfig) => {
    setTimeThemeEnabled(false);
    if (theme.mode) setMode(theme.mode);
    setColorTheme(theme.colorTheme);
    setBackgroundTheme(theme.backgroundTheme);
    
    setRecentlyUsed(prev => {
      const next = [theme.id, ...prev.filter(id => id !== theme.id)].slice(0, 5);
      localStorage.setItem('themeRecent', JSON.stringify(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{
      mode, setMode: handleSetMode,
      colorTheme, setColorTheme: handleSetColorTheme,
      backgroundTheme, setBackgroundTheme: handleSetBackgroundTheme,
      favorites, toggleFavorite,
      recentlyUsed, applyTheme, toggleMode: handleToggleMode,
      timeThemeEnabled, setTimeThemeEnabled
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
