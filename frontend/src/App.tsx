import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Settings } from './pages/Settings';
import { SmoothScroll } from './components/SmoothScroll';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AIChatPanel } from './components/AIChatPanel';
import { WhatsAppButton } from './components/WhatsAppButton';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { GalaxyBackground } from './components/GalaxyBackground';

function AppContent() {
  const {
    mode,
    toggleMode
  } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <LoadingScreen />
      <GalaxyBackground />
      <div className="min-h-screen">
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar theme={mode} toggleTheme={toggleMode} />

        {/* Settings Toggle Button */}
        <button
          onClick={() => setShowSettings(true)}
          className="fixed right-6 bottom-6 z-[100] p-4 rounded-full glass-adaptive text-primary-500 shadow-2xl border-primary-500/20 hover:scale-110 transition-transform"
        >
          <SettingsIcon className="animate-spin-slow" size={24} />
        </button>

        <AnimatePresence>
          {showSettings && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSettings(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]"
              />
              <Settings onClose={() => setShowSettings(false)} />
            </>
          )}
        </AnimatePresence>

        <main>
          <Hero />

          {/* About Section (Inline for brevity) */}
          <section id="about" className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl overflow-hidden glass p-4">
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 to-cyan-600 rounded-2xl flex items-center justify-center text-8xl">
                    👨‍💻
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl animate-float">
                  <p className="text-3xl font-bold text-primary-400">1+</p>
                  <p className="text-sm text-foreground/60">Years Experience</p>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold font-outfit mb-6">Crafting Solutions with <span className="text-gradient">Precision</span></h2>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  I am a passionate developer with a deep love for clean code and exceptional user interfaces.
                  My goal is to bridge the gap between complex functionality and beautiful design.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-2xl mb-1">10+</h4>
                    <p className="text-sm text-foreground/60">Projects Completed</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-2xl mb-1">15k+</h4>
                    <p className="text-sm text-foreground/60">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Skills />
          <Services />
          <Projects />
          <Experience />
          <Contact />
          <AIChatPanel />
          <WhatsAppButton />
        </main>

        <footer className="py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-foreground/50 text-sm">
              © 2026 Ayusman. Built with React & FastAPI.
            </p>
            <div className="flex gap-6 text-foreground/50 text-sm">
              <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
