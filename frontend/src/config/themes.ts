import type { ColorTheme, BackgroundTheme, Mode } from '../types/theme';

export interface ThemeConfig {
  id: string;
  name: string;
  category: 'appearance' | 'modern' | 'classic';
  mode?: Mode;
  colorTheme: ColorTheme;
  backgroundTheme: BackgroundTheme;
  gradient?: string;
  previewColor?: string;
  previewImage?: string;
}

export const themesConfig: ThemeConfig[] = [
  // Appearance
  { id: 'light', name: 'Light Mode', category: 'appearance', mode: 'light', colorTheme: 'violet', backgroundTheme: 'none' },
  { id: 'dark', name: 'Dark Mode', category: 'appearance', mode: 'dark', colorTheme: 'violet', backgroundTheme: 'none' },
  { id: 'system', name: 'System Default', category: 'appearance', mode: 'system', colorTheme: 'violet', backgroundTheme: 'none' },

  // Modern Themes
  { id: 'morning-warm', name: 'Soft Warm Morning', category: 'modern', colorTheme: 'amber', backgroundTheme: 'mesh', gradient: 'from-amber-400 to-orange-400', mode: 'light' },
  { id: 'ocean-blue', name: 'Ocean Blue', category: 'modern', colorTheme: 'blue', backgroundTheme: 'mesh', gradient: 'from-blue-600 to-cyan-400' },
  { id: 'aurora', name: 'Aurora', category: 'modern', colorTheme: 'emerald', backgroundTheme: 'mesh', gradient: 'from-emerald-500 to-teal-400' },
  { id: 'sunset', name: 'Sunset Gradient', category: 'modern', colorTheme: 'orange', backgroundTheme: 'mesh', gradient: 'from-orange-500 to-rose-400' },
  { id: 'cyberpunk', name: 'Cyberpunk', category: 'modern', colorTheme: 'pink', backgroundTheme: 'circuit', gradient: 'from-pink-500 to-purple-600' },
  { id: 'midnight', name: 'Midnight Neon', category: 'modern', colorTheme: 'indigo', backgroundTheme: 'stars', gradient: 'from-indigo-600 to-blue-900' },
  { id: 'purple-dream', name: 'Purple Dream', category: 'modern', colorTheme: 'purple', backgroundTheme: 'mesh', gradient: 'from-purple-500 to-indigo-400' },

  // Classic Themes
  { id: 'classic-blue', name: 'Blue', category: 'classic', colorTheme: 'blue', backgroundTheme: 'none', previewColor: '#3b82f6' },
  { id: 'classic-green', name: 'Green', category: 'classic', colorTheme: 'emerald', backgroundTheme: 'none', previewColor: '#10b981' },
  { id: 'classic-red', name: 'Red', category: 'classic', colorTheme: 'red', backgroundTheme: 'none', previewColor: '#ef4444' },
  { id: 'classic-purple', name: 'Purple', category: 'classic', colorTheme: 'purple', backgroundTheme: 'none', previewColor: '#a855f7' },
  { id: 'classic-orange', name: 'Orange', category: 'classic', colorTheme: 'orange', backgroundTheme: 'none', previewColor: '#f97316' },
  { id: 'classic-pink', name: 'Pink', category: 'classic', colorTheme: 'pink', backgroundTheme: 'none', previewColor: '#ec4899' },
  { id: 'classic-indigo', name: 'Indigo', category: 'classic', colorTheme: 'indigo', backgroundTheme: 'none', previewColor: '#6366f1' },
  { id: 'classic-lime', name: 'Lime', category: 'classic', colorTheme: 'lime', backgroundTheme: 'none', previewColor: '#84cc16' },
  { id: 'classic-retro', name: 'Retro', category: 'classic', colorTheme: 'amber', backgroundTheme: 'grid', previewColor: '#f59e0b' },
  { id: 'classic-matrix', name: 'Matrix', category: 'classic', colorTheme: 'emerald', backgroundTheme: 'dots', previewColor: '#00ff41' },
];
