import { motion } from 'framer-motion';
import { Heart, Check, Sun, Moon, Monitor } from 'lucide-react';
import type { ThemeConfig } from '../config/themes';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

interface ThemeCardProps {
  theme: ThemeConfig;
  isActive: boolean;
}

export const ThemeCard = ({ theme, isActive }: ThemeCardProps) => {
  const { applyTheme, favorites, toggleFavorite } = useTheme();
  const isFavorite = favorites.includes(theme.id);

  const getAppearanceIcon = () => {
    switch (theme.id) {
      case 'light': return <Sun size={24} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />;
      case 'dark': return <Moon size={24} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />;
      case 'system': return <Monitor size={24} className="text-primary-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />;
      default: return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => applyTheme(theme)}
      className={cn(
        "group relative rounded-2xl p-1 cursor-pointer transition-all duration-300",
        isActive ? "bg-gradient-to-br from-primary-500 to-cyan-500 shadow-lg shadow-primary-500/20" : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
      )}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 dark:bg-black/60">
        {/* Preview Content */}
        {theme.category === 'appearance' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {getAppearanceIcon()}
          </div>
        )}

        {theme.category === 'modern' && theme.gradient && (
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100", theme.gradient)} />
        )}

        {theme.category === 'classic' && (
          <div className="absolute inset-0" style={{ backgroundColor: theme.previewColor }} />
        )}

        {/* Selection Overlay */}
        <div className={cn(
          "absolute inset-0 transition-opacity flex items-center justify-center",
          isActive ? "bg-primary-500/10 opacity-100" : "bg-black/20 opacity-0 group-hover:opacity-100"
        )}>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary-500 text-white p-1 rounded-full shadow-lg z-20"
            >
              <Check size={16} />
            </motion.div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(theme.id);
          }}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all z-10",
            isFavorite ? "bg-rose-500 text-white" : "bg-black/40 text-white/40 hover:text-white"
          )}
        >
          <Heart size={12} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="px-3 py-2">
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-widest transition-colors",
          isActive ? "text-white" : "text-foreground/60 group-hover:text-foreground"
        )}>
          {theme.name}
        </p>
      </div>
    </motion.div>
  );
};
