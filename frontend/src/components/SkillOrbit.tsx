import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Sparkles, Cpu, Target, Award } from 'lucide-react';
import { cn } from '../utils/cn';

interface Planet {
  name: string;
  color: string;
  size: string;
  ring: number;
  speed: string;
  delay: string;
  icon: React.ReactNode;
}

interface SkillDetail {
  fullName: string;
  level: string;
  desc: string;
  colorClass: string;
  glowColor: string;
  iconText: string;
  iconElement: React.ReactNode;
  ring: number;
}

export const SkillOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // The active displayed skill (prioritizes hovered, falls back to clicked/selected)
  const activeSkill = hoveredSkill || selectedSkill;

  const planets: Planet[] = [
    { name: 'React', color: 'from-cyan-400 to-blue-500 shadow-cyan-500/35 border-cyan-300/30', size: 'w-12 h-12', ring: 1, speed: '14s', delay: '0s', icon: <span className="text-[10px] font-black text-white font-outfit select-none">React</span> },
    { name: 'UI/UX', color: 'from-pink-500 to-rose-500 shadow-pink-500/35 border-pink-300/30', size: 'w-10 h-10', ring: 1, speed: '14s', delay: '-7s', icon: <span className="text-[9px] font-black text-white font-outfit select-none">UI/UX</span> },
    { name: 'Python', color: 'from-blue-500 to-amber-400 shadow-blue-500/35 border-blue-300/30', size: 'w-12 h-12', ring: 2, speed: '20s', delay: '-3s', icon: <span className="text-[10px] font-black text-white font-outfit select-none">Py</span> },
    { name: 'Node.js', color: 'from-green-500 to-emerald-400 shadow-green-500/35 border-green-300/30', size: 'w-10 h-10', ring: 2, speed: '20s', delay: '-13s', icon: <span className="text-[9px] font-black text-white font-outfit select-none">Node</span> },
    { name: 'AI', color: 'from-indigo-500 to-purple-600 shadow-indigo-500/35 border-indigo-300/30', size: 'w-14 h-14', ring: 3, speed: '26s', delay: '-8s', icon: <span className="text-[11px] font-black text-white font-outfit select-none">AI</span> },
    { name: 'AWS', color: 'from-orange-400 to-red-500 shadow-orange-400/35 border-orange-300/30', size: 'w-11 h-11', ring: 3, speed: '26s', delay: '-21s', icon: <span className="text-[10px] font-black text-white font-outfit select-none">AWS</span> },
  ];

  const skillDetails: Record<string, SkillDetail> = {
    'React': {
      fullName: 'React & Next.js Ecosystem',
      level: '95% (Expert)',
      desc: 'Architecting gorgeous Single Page Applications, responsive layouts, modular component design, and custom state synchronization hubs.',
      colorClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      glowColor: 'rgba(34, 211, 238, 0.5)',
      iconText: 'React',
      iconElement: <Cpu className="w-5 h-5 text-cyan-400 animate-spin-slow" />,
      ring: 1
    },
    'UI/UX': {
      fullName: 'Creative UI/UX & Motion Design',
      level: '90% (Advanced)',
      desc: 'Crafting premium interactive interfaces with smooth micro-animations, rich glassmorphism structures, and modern color theory palettes.',
      colorClass: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      iconText: 'UI/UX',
      iconElement: <Award className="w-5 h-5 text-pink-400" />,
      ring: 1
    },
    'Python': {
      fullName: 'Python Backend Systems',
      level: '98% (Expert)',
      desc: 'Developing lightning-fast asynchronous APIs, custom database abstraction models, data automation pipelines, and robust scripts.',
      colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      iconText: 'Py',
      iconElement: <Code className="w-5 h-5 text-amber-400" />,
      ring: 2
    },
    'Node.js': {
      fullName: 'Node.js Event-Driven APIs',
      level: '92% (Expert)',
      desc: 'Building high-capacity REST backends, real-time client-server communication channels, and secure serverless microservice tasks.',
      colorClass: 'text-green-400 border-green-500/30 bg-green-500/10',
      glowColor: 'rgba(52, 211, 153, 0.5)',
      iconText: 'Node',
      iconElement: <Cpu className="w-5 h-5 text-green-400" />,
      ring: 2
    },
    'AI': {
      fullName: 'Advanced AI & LLM Engineering',
      level: '90% (Advanced)',
      desc: 'Connecting API services like Google Gemini, rule fallback logic, prompting templates, and smart responsive conversational systems.',
      colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      glowColor: 'rgba(129, 140, 248, 0.5)',
      iconText: 'AI',
      iconElement: <Target className="w-5 h-5 text-indigo-400" />,
      ring: 3
    },
    'AWS': {
      fullName: 'AWS Cloud Infrastructure',
      level: '85% (Advanced)',
      desc: 'Deploying robust hostings across EC2 nodes, S3 buckets, custom VPC routes, and secure auto-deploy CI/CD integration routes.',
      colorClass: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      glowColor: 'rgba(251, 146, 60, 0.5)',
      iconText: 'AWS',
      iconElement: <Award className="w-5 h-5 text-orange-400" />,
      ring: 3
    }
  };

  return (
    <div 
      className="relative w-full h-[460px] flex flex-col items-center justify-center overflow-hidden cursor-default"
      onClick={() => setSelectedSkill(null)}
    >
      {/* 3D Orbit CSS Animations Injection */}
      <style>{`
        @keyframes orbit-ring-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-orbit-ring-1 {
          from { transform: rotate(360deg) rotateX(-60deg) rotateY(-10deg); }
          to { transform: rotate(0deg) rotateX(-60deg) rotateY(-10deg); }
        }
        @keyframes orbit-ring-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes counter-orbit-ring-2 {
          from { transform: rotate(0deg) rotateX(-65deg) rotateY(15deg); }
          to { transform: rotate(360deg) rotateX(-65deg) rotateY(15deg); }
        }
        @keyframes orbit-ring-3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-orbit-ring-3 {
          from { transform: rotate(360deg) rotateX(-70deg) rotateY(-5deg); }
          to { transform: rotate(0deg) rotateX(-70deg) rotateY(-5deg); }
        }
        
        .orbit-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .orbit-ring {
          position: absolute;
          border: 1.5px dashed rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: border-color 0.3s;
        }
        .planet-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          top: 0;
          left: 0;
          transition: all 0.3s;
          pointer-events: none;
        }
        .planet {
          position: absolute;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(4px);
          pointer-events: auto;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border 0.3s, box-shadow 0.3s;
        }
      `}</style>

      {/* Orbit Interactive Sandbox */}
      <div className="orbit-container relative w-[420px] h-[360px] flex items-center justify-center -translate-y-4">
        
        {/* Core Pulsing Hologram Avatar */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, delay: 0.1 }}
          className={cn(
            "absolute w-28 h-28 rounded-full p-[3px] z-20 flex items-center justify-center cursor-pointer transition-all duration-500",
            activeSkill 
              ? "bg-gradient-to-tr from-primary-500 to-cyan-400 shadow-2xl shadow-primary-500/40 scale-105" 
              : "bg-gradient-to-tr from-white/10 to-white/5 shadow-xl border border-white/10"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSkill(null);
          }}
          style={{
            boxShadow: activeSkill ? `0 0 35px ${skillDetails[activeSkill].glowColor}` : undefined
          }}
        >
          {/* Subtle pulse aura */}
          <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping opacity-70 -z-10" />

          <div className="w-full h-full rounded-full bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden border border-white/10 relative p-2 text-center select-none">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div 
                  key={activeSkill}
                  initial={{ opacity: 0, y: 8, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="mb-1">{skillDetails[activeSkill].iconElement}</div>
                  <span className={cn("text-[10px] font-black tracking-wider uppercase font-outfit", skillDetails[activeSkill].colorClass.split(' ')[0])}>
                    {activeSkill}
                  </span>
                  <span className="text-[7px] text-white/50 uppercase tracking-widest font-black mt-0.5">
                    {skillDetails[activeSkill].level.split(' ')[0]}
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  key="avatar-idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center"
                >
                  <Code className="w-7 h-7 text-white/80 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest text-white/60 font-black font-outfit mt-1.5">Skill Core</span>
                  <span className="text-[6px] text-white/30 uppercase tracking-wider font-bold mt-0.5">Ayusman</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tactical Ambient Glows */}
        <div className="absolute w-[200px] h-[200px] bg-primary-500/5 rounded-full blur-[90px] -z-10 animate-pulse-slow will-change-transform" />
        {activeSkill && (
          <div 
            className="absolute w-[240px] h-[240px] rounded-full blur-[100px] -z-10 transition-all duration-500 will-change-transform"
            style={{ backgroundColor: skillDetails[activeSkill].glowColor }}
          />
        )}
        
        {/* Orbit Ring 1 (Inner) - diameter 200px */}
        <div 
          className={cn(
            "orbit-ring w-[200px] h-[200px]",
            activeSkill && skillDetails[activeSkill].ring === 1 ? "border-white/20" : ""
          )}
          style={{ transform: 'rotateX(60deg) rotateY(10deg)' }}
        >
          {planets.filter(p => p.ring === 1).map((planet) => {
            const isHovered = hoveredSkill === planet.name;
            const isSelected = selectedSkill === planet.name;
            const isPaused = isHovered || isSelected;

            return (
              <div 
                key={planet.name}
                className="planet-wrapper"
                style={{
                  animation: `orbit-ring-1 ${planet.speed} linear infinite`,
                  animationDelay: planet.delay,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                <div 
                  className={cn(
                    "planet bg-gradient-to-br shadow-lg cursor-pointer hover:scale-125",
                    planet.size,
                    planet.color,
                    isSelected ? "ring-4 ring-white/50 border-white scale-115" : "",
                    isHovered ? "ring-2 ring-white/30 scale-125" : ""
                  )}
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `counter-orbit-ring-1 ${planet.speed} linear infinite`,
                    animationDelay: planet.delay,
                    animationPlayState: isPaused ? 'paused' : 'running',
                    boxShadow: isPaused ? `0 0 22px currentColor` : undefined
                  }}
                  onMouseEnter={() => setHoveredSkill(planet.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSkill(planet.name === selectedSkill ? null : planet.name);
                  }}
                >
                  {planet.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Ring 2 (Middle) - diameter 310px */}
        <div 
          className={cn(
            "orbit-ring w-[310px] h-[310px]",
            activeSkill && skillDetails[activeSkill].ring === 2 ? "border-white/20" : ""
          )}
          style={{ transform: 'rotateX(65deg) rotateY(-15deg)' }}
        >
          {planets.filter(p => p.ring === 2).map((planet) => {
            const isHovered = hoveredSkill === planet.name;
            const isSelected = selectedSkill === planet.name;
            const isPaused = isHovered || isSelected;

            return (
              <div 
                key={planet.name}
                className="planet-wrapper"
                style={{
                  animation: `orbit-ring-2 ${planet.speed} linear infinite`,
                  animationDelay: planet.delay,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                <div 
                  className={cn(
                    "planet bg-gradient-to-br shadow-lg cursor-pointer hover:scale-125",
                    planet.size,
                    planet.color,
                    isSelected ? "ring-4 ring-white/50 border-white scale-115" : "",
                    isHovered ? "ring-2 ring-white/30 scale-125" : ""
                  )}
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `counter-orbit-ring-2 ${planet.speed} linear infinite`,
                    animationDelay: planet.delay,
                    animationPlayState: isPaused ? 'paused' : 'running',
                    boxShadow: isPaused ? `0 0 22px currentColor` : undefined
                  }}
                  onMouseEnter={() => setHoveredSkill(planet.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSkill(planet.name === selectedSkill ? null : planet.name);
                  }}
                >
                  {planet.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Ring 3 (Outer) - diameter 420px */}
        <div 
          className={cn(
            "orbit-ring w-[420px] h-[420px]",
            activeSkill && skillDetails[activeSkill].ring === 3 ? "border-white/20" : ""
          )}
          style={{ transform: 'rotateX(70deg) rotateY(5deg)' }}
        >
          {planets.filter(p => p.ring === 3).map((planet) => {
            const isHovered = hoveredSkill === planet.name;
            const isSelected = selectedSkill === planet.name;
            const isPaused = isHovered || isSelected;

            return (
              <div 
                key={planet.name}
                className="planet-wrapper"
                style={{
                  animation: `orbit-ring-3 ${planet.speed} linear infinite`,
                  animationDelay: planet.delay,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                <div 
                  className={cn(
                    "planet bg-gradient-to-br shadow-lg cursor-pointer hover:scale-125",
                    planet.size,
                    planet.color,
                    isSelected ? "ring-4 ring-white/50 border-white scale-115" : "",
                    isHovered ? "ring-2 ring-white/30 scale-125" : ""
                  )}
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `counter-orbit-ring-3 ${planet.speed} linear infinite`,
                    animationDelay: planet.delay,
                    animationPlayState: isPaused ? 'paused' : 'running',
                    boxShadow: isPaused ? `0 0 22px currentColor` : undefined
                  }}
                  onMouseEnter={() => setHoveredSkill(planet.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSkill(planet.name === selectedSkill ? null : planet.name);
                  }}
                >
                  {planet.icon}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Floating Skill Card Overlay (Dynamic Height & Apple-smooth Slide Animation) */}
      <div className="absolute bottom-2 left-4 right-4 z-30 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <motion.div 
          layout
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className={cn(
            "glass-card border border-white/10 rounded-2xl bg-black/85 backdrop-blur-md shadow-xl flex items-center transition-all duration-300 select-none overflow-hidden",
            activeSkill ? "p-5 min-h-[110px]" : "p-2.5 min-h-[40px]"
          )}
        >
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div 
                key={activeSkill}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="flex-1 flex items-start gap-3 w-full"
              >
                <div className={cn("px-2.5 py-1.5 rounded-xl border shrink-0 font-black text-xs font-outfit uppercase shadow-lg shadow-black/20 flex items-center gap-1.5", skillDetails[activeSkill].colorClass)}>
                  {activeSkill}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-black text-sm font-outfit text-white truncate">
                      {skillDetails[activeSkill].fullName}
                    </h4>
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase shrink-0 shadow-sm", skillDetails[activeSkill].colorClass)}>
                      {skillDetails[activeSkill].level}
                    </span>
                  </div>
                  <p className="text-[12px] text-white/90 font-medium leading-relaxed mt-2 tracking-wide">
                    {skillDetails[activeSkill].desc}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="idle-guide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-white/70 w-full justify-center"
              >
                <Sparkles size={13} className="text-cyan-400 animate-pulse shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-widest text-center">
                  ✨ Hover or click any planet to explore architectures
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
};
