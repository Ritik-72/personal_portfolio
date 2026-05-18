import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Clock, X, Palette, Layout, Settings as SettingsIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themesConfig } from '../config/themes';
import { ThemeCard } from '../components/ThemeCard';
import { cn } from '../utils/cn';

export const Settings = ({ onClose }: { onClose: () => void }) => {
  const { mode, colorTheme, backgroundTheme, favorites, recentlyUsed } = useTheme();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');

  const filteredThemes = useMemo(() => {
    let themes = themesConfig;
    
    if (activeTab === 'favorites') {
      themes = themes.filter(t => favorites.includes(t.id));
    } else if (activeTab === 'recent') {
      themes = themes.filter(t => recentlyUsed.includes(t.id));
    }

    if (search) {
      themes = themes.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    }

    return themes;
  }, [search, activeTab, favorites, recentlyUsed]);

  const categories = [
    { id: 'appearance', label: 'Appearance', icon: <Monitor size={16} /> },
    { id: 'modern', label: 'Modern Themes', icon: <Palette size={16} /> },
    { id: 'classic', label: 'Classic Themes', icon: <Layout size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-6 md:inset-12 z-[200] glass-adaptive rounded-[2.5rem] shadow-2xl border border-white/20 flex overflow-hidden"
    >
      {/* Sidebar */}
      <div className="w-20 md:w-64 border-r border-white/10 bg-black/5 dark:bg-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-primary-500 rounded-xl text-white">
            <SettingsIcon size={20} />
          </div>
          <h1 className="text-xl font-bold font-outfit hidden md:block">Settings</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'all', label: 'All Themes', icon: <Palette size={20} /> },
            { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
            { id: 'recent', label: 'Recently Used', icon: <Clock size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-2xl transition-all",
                activeTab === item.id 
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
                  : "text-foreground/60 hover:bg-white/10"
              )}
            >
              {item.icon}
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={onClose}
          className="w-full flex items-center gap-4 p-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all mt-auto"
        >
          <X size={20} />
          <span className="font-medium hidden md:block">Close</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-8 pb-0 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-bold font-outfit">Personalization</h2>
            <p className="text-foreground/70 dark:text-foreground/60 text-sm mt-1">Customize your workspace experience</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60 dark:text-foreground/40" size={18} />
            <input
              type="text"
              placeholder="Search themes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/10 focus:border-primary-500 transition-all outline-none"
            />
          </div>
        </header>

        {/* Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 pt-6" data-lenis-prevent>
          <AnimatePresence mode="popLayout">
            {activeTab === 'all' ? (
              <div className="space-y-12">
                {categories.map((cat) => {
                  const catThemes = filteredThemes.filter(t => t.category === cat.id);
                  if (catThemes.length === 0) return null;

                  return (
                    <motion.section
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2 mb-6 text-foreground/90 dark:text-foreground">
                        {cat.icon}
                        <h3 className="text-sm font-bold uppercase tracking-widest">{cat.label}</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {catThemes.map((theme) => (
                          <ThemeCard
                            key={theme.id}
                            theme={theme}
                            isActive={
                              (theme.category === 'appearance' && mode === theme.mode) ||
                              (theme.category !== 'appearance' && colorTheme === theme.colorTheme && (backgroundTheme === theme.backgroundTheme || theme.category === 'classic'))
                            }
                          />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {filteredThemes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={
                      (theme.category === 'appearance' && mode === theme.mode) ||
                      (theme.category !== 'appearance' && colorTheme === theme.colorTheme)
                    }
                  />
                ))}
                {filteredThemes.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-foreground/40">
                    <Palette size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">No themes found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Re-export Monitor icon from lucide-react since it was missed in imports
import { Monitor } from 'lucide-react';
