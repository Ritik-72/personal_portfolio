import { useState, useEffect } from 'react';
import type { Mode, ColorTheme, BackgroundTheme } from '../types/theme';

export const useTheme = () => {
  const [mode, setMode] = useState<Mode>(
    () => (localStorage.getItem('mode') as Mode) || 'dark'
  );
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem('colorTheme') as ColorTheme) || 'violet'
  );
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>(
    () => (localStorage.getItem('backgroundTheme') as BackgroundTheme) || 'none'
  );

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
    const colorClasses = [
      'theme-blue', 'theme-purple', 'theme-rose', 'theme-amber', 
      'theme-emerald', 'theme-cyan', 'theme-orange', 'theme-pink', 
      'theme-indigo', 'theme-lime', 'theme-red', 'theme-classic-blue',
      'theme-classic-gray', 'theme-classic-dark-blue'
    ];
    root.classList.remove(...colorClasses);
    if (colorTheme !== 'violet') {
      root.classList.add(`theme-${colorTheme}`);
    }
    localStorage.setItem('colorTheme', colorTheme);

    // Handle Background Theme
    const bgClasses = ['bg-mesh', 'bg-grid', 'bg-dots', 'bg-stars', 'bg-circuit'];
    body.classList.remove(...bgClasses);
    if (backgroundTheme !== 'none') {
      body.classList.add(`bg-${backgroundTheme}`);
    }
    localStorage.setItem('backgroundTheme', backgroundTheme);
  }, [mode, colorTheme, backgroundTheme]);

  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { 
    mode, setMode, 
    colorTheme, setColorTheme, 
    backgroundTheme, setBackgroundTheme,
    toggleMode 
  };
};
