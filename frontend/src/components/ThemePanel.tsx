import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Check, Monitor, Sun, Moon, ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import type { Mode, ColorTheme, BackgroundTheme } from '../types/theme';

interface ThemePanelProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
}

const colorThemes: { name: ColorTheme; color: string; label?: string }[] = [
  { name: 'violet', color: '#8b5cf6' },
  { name: 'blue', color: '#3b82f6' },
  { name: 'purple', color: '#a855f7' },
  { name: 'rose', color: '#f43f5e' },
  { name: 'amber', color: '#f59e0b' },
  { name: 'emerald', color: '#10b981' },
  { name: 'cyan', color: '#06b6d4' },
  { name: 'orange', color: '#f97316' },
  { name: 'pink', color: '#ec4899' },
  { name: 'indigo', color: '#6366f1' },
  { name: 'lime', color: '#84cc16' },
  { name: 'red', color: '#ef4444' },
  { name: 'classic-blue', color: '#2563eb' },
  { name: 'classic-gray', color: '#4b5563' },
  { name: 'classic-dark-blue', color: '#1e3a8a' },
];

const modernThemes: { id: BackgroundTheme; label: string; previewClass: string }[] = [
  { id: 'none', label: 'Solid', previewClass: 'bg-black/5 dark:bg-white/5' },
  { id: 'mesh', label: 'Mesh', previewClass: 'bg-mesh bg-center bg-no-repeat bg-cover' },
  { id: 'grid', label: 'Grid', previewClass: 'bg-grid bg-repeat opacity-60' },
  { id: 'dots', label: 'Dots', previewClass: 'bg-dots bg-repeat opacity-60' },
  { id: 'stars', label: 'Stars', previewClass: 'bg-stars bg-black' },
  { id: 'circuit', label: 'Circuit', previewClass: 'bg-circuit bg-repeat opacity-40' },
];

export const ThemePanel = ({ 
  mode, setMode, 
  colorTheme, setColorTheme, 
  backgroundTheme, setBackgroundTheme 
}: ThemePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-[100] p-4 rounded-full glass-adaptive text-primary-500 shadow-2xl border-primary-500/20"
      >
        <Settings className="animate-spin-slow" size={24} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 glass-adaptive z-[120] p-8 shadow-2xl border-l border-white/10 overflow-y-auto text-foreground"
            data-lenis-prevent
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-outfit">Theme Settings</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Dark Mode Section */}
            <div className="mb-10">
              <p className="text-sm font-bold opacity-80 mb-4">Dark mode</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'light', icon: <Sun size={18} />, label: 'Light' },
                  { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
                  { id: 'system', icon: <Monitor size={18} />, label: 'System' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id as Mode)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all",
                      mode === item.id 
                        ? "border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400" 
                        : "border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                  >
                    <div className="w-full aspect-[4/3] rounded-lg flex items-center justify-center mb-1">
                       {item.icon}
                    </div>
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modern Themes Section */}
            <div className="mb-10">
              <p className="text-sm font-bold opacity-80 mb-2">Modern themes</p>
              <p className="text-xs opacity-50 mb-4 leading-snug">
                Modern themes allow you to add a background image for further customization
              </p>
              <div className="grid grid-cols-2 gap-3">
                {modernThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setBackgroundTheme(theme.id)}
                    className={cn(
                      "group relative aspect-video rounded-xl border-2 overflow-hidden transition-all",
                      backgroundTheme === theme.id ? "border-primary-500 ring-2 ring-primary-500/20" : "border-black/5 dark:border-white/5"
                    )}
                  >
                    <div className={cn("absolute inset-0 w-full h-full", theme.previewClass)} />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                       <span className={cn(
                         "text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md",
                         backgroundTheme === theme.id && "text-primary-400"
                       )}>
                         {theme.label}
                       </span>
                       {backgroundTheme === theme.id && <Check className="absolute top-2 right-2 text-primary-400" size={14} />}
                    </div>
                  </button>
                ))}
                {/* Image Placeholder */}
                <button className="group relative aspect-video rounded-xl border-2 border-dashed border-black/10 dark:border-white/10 overflow-hidden hover:border-primary-500/50 transition-all flex flex-col items-center justify-center gap-1">
                   <ImageIcon size={18} className="opacity-40 group-hover:text-primary-500" />
                   <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 group-hover:text-primary-500">Custom</span>
                </button>
              </div>
            </div>

            {/* Classic Themes Section */}
            <div className="mb-10">
              <p className="text-sm font-bold opacity-80 mb-4">Classic themes</p>
              <div className="grid grid-cols-5 gap-2">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => setColorTheme(theme.name)}
                    className={cn(
                      "group relative w-12 h-12 rounded-lg flex items-center justify-center transition-all overflow-hidden",
                      colorTheme === theme.name ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-background" : "hover:scale-105"
                    )}
                    style={{ backgroundColor: theme.color }}
                  >
                    {colorTheme === theme.name && <Check size={18} className="text-white drop-shadow-md z-10" />}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-primary-500/10 border border-primary-500/20">
               <p className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-widest">Workspace</p>
               <p className="text-xs leading-relaxed opacity-70">
                 Change your theme to reflect your current mood or focus area. 
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
