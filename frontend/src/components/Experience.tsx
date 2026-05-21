import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Code, Award, Trophy, ShieldCheck, Lock, Unlock, Sparkles, X, Check } from 'lucide-react';
import { cn } from '../utils/cn';
import Tilt from 'react-parallax-tilt';

interface Skill {
  name: string;
  level: number;
}

interface Badge {
  name: string;
  title: string;
  rarity: string;
  xp: string;
  icon: string;
  skills: Skill[];
  achievements: string[];
}

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  badge: Badge;
}

const experiences: ExperienceItem[] = [
  {
    id: 'bsc',
    title: 'B.Sc. Computer Science Honours',
    company: 'Dhenkanal Autonomous College',
    period: '2020 - 2023',
    description:
      'Completed graduation in Computer Science with strong foundation in programming, networking, algorithms, and software development.',
    highlights: [
      'Programming Fundamentals',
      'Data Structures',
      'Computer Networks',
      'Operating Systems',
      'Frontend Development',
    ],
    badge: {
      name: 'Code Initiate',
      title: 'The Genesis Chapter',
      rarity: 'Rare',
      xp: '800 XP',
      icon: 'Award',
      skills: [
        { name: 'C++ & Programming Core', level: 85 },
        { name: 'Data Structures & Algorithms', level: 80 },
        { name: 'Computer Networks & OS', level: 78 },
        { name: 'Frontend Basics', level: 82 }
      ],
      achievements: [
        'Built strong foundation in OOP and system architecture',
        'Designed network communication prototypes',
        'Created multiple static & dynamic web applications'
      ]
    }
  },
  {
    id: 'mca',
    title: 'Master of Computer Applications (MCA)',
    company: 'IGIT Sarang',
    period: '2023 - 2025',
    description:
      'Completed MCA with specialization in software development, backend technologies, databases, and cloud computing.',
    highlights: [
      'Advanced Programming',
      'Database Management',
      'Web Development',
      'Software Engineering',
    ],
    badge: {
      name: 'Algorithm Tactician',
      title: 'The Specialization Chapter',
      rarity: 'Epic',
      xp: '1,500 XP',
      icon: 'ShieldCheck',
      skills: [
        { name: 'Software Engineering', level: 88 },
        { name: 'Database Management', level: 85 },
        { name: 'Web Technologies', level: 80 },
        { name: 'Cloud Computing', level: 75 }
      ],
      achievements: [
        'Specialized in advanced database systems and optimization',
        'Implemented enterprise-grade software architecture patterns',
        'Graduated with honors in advanced computational theories'
      ]
    }
  },
  {
    id: 'bipros',
    title: 'Python Developer',
    company: 'Bipros',
    period: 'MAY 2025 - Present',
    description:
      'Currently working as a Python Developer on the Ama Sathi WhatsApp Chatbot project (Official No: 9437292000) for Odisha government services. Building scalable backend APIs, chatbot workflows, and integrations using FastAPI, PostgreSQL, and WhatsApp APIs.',
    highlights: [
      'FastAPI Backend Development',
      'WhatsApp Chatbot Integration',
      'Government Service Automation',
      'PostgreSQL Database Management',
      'FastAPI Framework',
    ],
    badge: {
      name: 'Chatbot Architect',
      title: 'The Government Automation Chapter',
      rarity: 'Legendary',
      xp: '2,500 XP',
      icon: 'Trophy',
      skills: [
        { name: 'FastAPI Backend', level: 95 },
        { name: 'WhatsApp API & Workflows', level: 90 },
        { name: 'PostgreSQL & Databases', level: 85 },
        { name: 'Automations', level: 90 }
      ],
      achievements: [
        'Built APIs serving citizen automation for Odisha government',
        'Engineered scalable conversational workflows for millions of users',
        'Integrated official WhatsApp APIs with secure FastAPI endpoints'
      ]
    }
  }
];

export const educationData = [
  {
    institute: 'IGIT Sarang',
    degree: 'Master of Computer Applications (MCA)',
    period: '2023 - 2025',
    description:
      'Completed MCA with focus on software engineering, web technologies, cloud computing, and backend development.',
  },
  {
    institute: 'BJB Autonomous College',
    degree: 'B.Sc. Computer Science Honours',
    period: '2020 - 2023',
    description:
      'Studied core computer science subjects including programming, databases, networking, operating systems, and software development.',
  },
];

/* ─── Decorative orbital background elements ────────────────────────────── */
const OrbitalGraphic = ({ flip = false, top = '10%' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top,
      [flip ? 'right' : 'left']: '-60px',
      width: '220px',
      height: '260px',
      pointerEvents: 'none',
      zIndex: 0,
      transform: flip ? 'scaleX(-1)' : 'none',
    }}
  >
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <ellipse cx="100" cy="130" rx="55" ry="30" fill="rgba(139,92,246,0.13)" />
      <ellipse cx="115" cy="145" rx="38" ry="22" fill="rgba(6,182,212,0.10)" />
      <ellipse cx="90" cy="120" rx="28" ry="16" fill="rgba(236,72,153,0.08)" />

      <ellipse
        cx="110"
        cy="130"
        rx="90"
        ry="38"
        stroke="rgba(139,92,246,0.22)"
        strokeWidth="1"
        fill="none"
        style={{ animation: 'orbitSpin1 12s linear infinite', transformOrigin: '110px 130px' }}
      />
      <ellipse
        cx="110"
        cy="130"
        rx="70"
        ry="55"
        stroke="rgba(6,182,212,0.18)"
        strokeWidth="0.8"
        fill="none"
        style={{ animation: 'orbitSpin2 18s linear infinite reverse', transformOrigin: '110px 130px' }}
      />
      <ellipse
        cx="110"
        cy="130"
        rx="45"
        ry="18"
        stroke="rgba(236,72,153,0.15)"
        strokeWidth="0.8"
        fill="none"
        style={{ animation: 'orbitSpin3 8s linear infinite', transformOrigin: '110px 130px' }}
      />

      <circle r="10" fill="rgba(30,20,60,0.85)" style={{ animation: 'dot1 12s linear infinite', offsetPath: 'none' }}>
        <animateMotion dur="12s" repeatCount="indefinite">
          <mpath href="#path-orbit1" />
        </animateMotion>
      </circle>
      <circle r="7" fill="rgba(20,15,50,0.80)">
        <animateMotion dur="18s" repeatCount="indefinite">
          <mpath href="#path-orbit2" />
        </animateMotion>
      </circle>
      <circle r="5" fill="rgba(25,18,55,0.75)">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#path-orbit3" />
        </animateMotion>
      </circle>

      <circle cx="165" cy="88" r="2.5" fill="rgba(139,92,246,0.6)" />
      <circle cx="55" cy="170" r="1.8" fill="rgba(6,182,212,0.5)" />
      <circle cx="140" cy="175" r="1.5" fill="rgba(236,72,153,0.5)" />

      <defs>
        <path id="path-orbit1" d="M 200,130 A 90,38 0 1,1 199.9,130" />
        <path id="path-orbit2" d="M 180,130 A 70,55 0 1,1 179.9,130" />
        <path id="path-orbit3" d="M 155,130 A 45,18 0 1,1 154.9,130" />
      </defs>
    </svg>

    <style>{`
      @keyframes orbitSpin1 {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes orbitSpin2 {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes orbitSpin3 {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const ConstellationCluster = ({ flip = false, top = '55%' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top,
      [flip ? 'right' : 'left']: '10px',
      width: '180px',
      height: '160px',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.55,
    }}
  >
    <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <line x1="30" y1="40" x2="90" y2="70" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8" />
      <line x1="90" y1="70" x2="150" y2="50" stroke="rgba(6,182,212,0.3)" strokeWidth="0.8" />
      <line x1="90" y1="70" x2="110" y2="130" stroke="rgba(139,92,246,0.25)" strokeWidth="0.8" />
      <line x1="110" y1="130" x2="60" y2="120" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" />
      <line x1="30" y1="40" x2="60" y2="120" stroke="rgba(139,92,246,0.15)" strokeWidth="0.6" />
      <circle cx="30" cy="40" r="3" fill="rgba(139,92,246,0.6)" />
      <circle cx="90" cy="70" r="4" fill="rgba(139,92,246,0.7)" />
      <circle cx="150" cy="50" r="2.5" fill="rgba(6,182,212,0.6)" />
      <circle cx="110" cy="130" r="3" fill="rgba(6,182,212,0.55)" />
      <circle cx="60" cy="120" r="2" fill="rgba(236,72,153,0.5)" />
      <circle cx="145" cy="110" r="1.5" fill="rgba(139,92,246,0.4)" />
      <circle cx="20" cy="100" r="1.5" fill="rgba(6,182,212,0.35)" />
    </svg>
  </div>
);

const FloatingRings = ({ flip = false, top = '30%' }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top,
      [flip ? 'right' : 'left']: '20px',
      width: '140px',
      height: '140px',
      pointerEvents: 'none',
      zIndex: 0,
      animation: 'floatUpDown 6s ease-in-out infinite',
    }}
  >
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="70" cy="70" r="55" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
      <circle cx="70" cy="70" r="40" stroke="rgba(6,182,212,0.10)" strokeWidth="0.8" />
      <circle cx="70" cy="70" r="25" stroke="rgba(236,72,153,0.09)" strokeWidth="0.7" />
      <line x1="70" y1="15" x2="70" y2="125" stroke="rgba(139,92,246,0.08)" strokeWidth="0.6" />
      <line x1="15" y1="70" x2="125" y2="70" stroke="rgba(6,182,212,0.08)" strokeWidth="0.6" />
      <circle cx="70" cy="15" r="3" fill="rgba(139,92,246,0.45)" />
      <circle cx="125" cy="70" r="2.5" fill="rgba(6,182,212,0.40)" />
    </svg>
    <style>{`
      @keyframes floatUpDown {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-14px); }
      }
    `}</style>
  </div>
);

/* ─── Mini Interactive Experience Orbit ───────────────────────────────────── */
const MiniOrbit = ({ 
  centerIcon, 
  centerText, 
  items, 
  color, 
  glowColor 
}: { 
  centerIcon: React.ReactNode; 
  centerText: string; 
  items: string[]; 
  color: string; 
  glowColor: string; 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const ring1Items = items.slice(0, 2);
  const ring2Items = items.slice(2);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center overflow-visible select-none my-6 md:my-0">
      <style>{`
        @keyframes mini-orbit-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mini-counter-1 {
          from { transform: rotate(360deg) rotateX(-60deg) rotateY(-10deg); }
          to { transform: rotate(0deg) rotateX(-60deg) rotateY(-10deg); }
        }
        @keyframes mini-orbit-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes mini-counter-2 {
          from { transform: rotate(0deg) rotateX(-65deg) rotateY(15deg); }
          to { transform: rotate(360deg) rotateX(-65deg) rotateY(15deg); }
        }
      `}</style>

      <div 
        className="relative w-[240px] h-[240px] flex items-center justify-center"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <div 
          className={cn(
            "absolute w-16 h-16 rounded-full bg-gradient-to-tr p-[2px] z-10 flex items-center justify-center transition-all duration-300 shadow-lg",
            color
          )}
          style={{ boxShadow: `0 0 20px ${glowColor}` }}
        >
          <div className="w-full h-full rounded-full bg-black/90 flex flex-col items-center justify-center overflow-hidden border border-white/10 text-center relative group p-1">
            {centerIcon}
            <span className="text-[7px] uppercase tracking-widest text-white/50 font-black font-outfit mt-0.5">{centerText}</span>
          </div>
        </div>

        <div 
          className="absolute w-[120px] h-[120px] rounded-full blur-[50px] -z-10 opacity-30"
          style={{ backgroundColor: glowColor }}
        />

        <div 
          className="absolute border border-dashed border-white/10 rounded-full w-[130px] h-[130px]"
          style={{ transform: 'rotateX(60deg) rotateY(10deg)', transformStyle: 'preserve-3d', pointerEvents: 'none' }}
        >
          {ring1Items.map((item, idx) => {
            const index = idx;
            const isHovered = hoveredIndex === index;
            return (
              <div 
                key={item}
                className="absolute w-full h-full top-0 left-0"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: `mini-orbit-1 ${10 + idx * 2}s linear infinite`,
                  animationDelay: `${idx * -5}s`,
                  animationPlayState: isHovered ? 'paused' : 'running'
                }}
              >
                <div 
                  className={cn(
                    "absolute w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center border border-white/20 shadow-md text-[8px] font-black text-white font-outfit cursor-pointer transition-transform duration-300 pointer-events-auto",
                    isHovered ? "scale-125 shadow-lg animate-pulse" : ""
                  )}
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `mini-counter-1 ${10 + idx * 2}s linear infinite`,
                    animationDelay: `${idx * -5}s`,
                    animationPlayState: isHovered ? 'paused' : 'running',
                    boxShadow: isHovered ? `0 0 12px ${glowColor}` : undefined
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className="absolute border border-dashed border-white/10 rounded-full w-[210px] h-[210px]"
          style={{ transform: 'rotateX(65deg) rotateY(-15deg)', transformStyle: 'preserve-3d', pointerEvents: 'none' }}
        >
          {ring2Items.map((item, idx) => {
            const index = idx + 2;
            const isHovered = hoveredIndex === index;
            return (
              <div 
                key={item}
                className="absolute w-full h-full top-0 left-0"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: `mini-orbit-2 ${14 + idx * 2}s linear infinite`,
                  animationDelay: `${idx * -7}s`,
                  animationPlayState: isHovered ? 'paused' : 'running'
                }}
              >
                <div 
                  className={cn(
                    "absolute w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border border-white/20 shadow-md text-[8px] font-black text-white font-outfit cursor-pointer transition-transform duration-300 pointer-events-auto",
                    isHovered ? "scale-125 shadow-lg animate-pulse" : ""
                  )}
                  style={{
                    top: '50%',
                    left: '100%',
                    transform: 'translate(-50%, -50%)',
                    animation: `mini-counter-2 ${14 + idx * 2}s linear infinite`,
                    animationDelay: `${idx * -7}s`,
                    animationPlayState: isHovered ? 'paused' : 'running',
                    boxShadow: isHovered ? `0 0 12px ${glowColor}` : undefined
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

/* ─── Mapping Helper for Badge Icons ───────────────────────────────────── */
const BadgeIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Trophy':
      return <Trophy className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Award':
      return <Award className={className} />;
    default:
      return <Award className={className} />;
  }
};

/* ─── Custom Floating Particle Explosion ───────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const ParticleExplosion = ({ color }: { color: string }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [color, '#ffffff', '#8b5cf6', '#06b6d4', '#ec4899'];
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.1,
      duration: Math.random() * 1.2 + 0.6,
    }));
    setParticles(newParticles);
  }, [color]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x * 2.5,
            y: p.y * 2.5 - 60,
            opacity: 0,
            scale: [0, 1.3, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Milestone Node Component ─────────────────────────────────────────── */
const MilestoneNode = ({ 
  active, 
  index, 
  exp 
}: { 
  active: boolean; 
  index: number; 
  exp: ExperienceItem;
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {active && (
        <>
          <motion.div 
            className="absolute w-16 h-16 rounded-full bg-primary-500/20 blur-sm"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-20 h-20 rounded-full border border-primary-500/30"
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.4, 0.1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </>
      )}

      <motion.div 
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10",
          active 
            ? "bg-black border-primary-500 shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]" 
            : "bg-black/85 border-white/10 text-white/40"
        )}
        whileHover={{ scale: 1.15 }}
      >
        {active ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <BadgeIcon name={exp.badge.icon} className="w-5 h-5 text-primary-400" />
          </motion.div>
        ) : (
          <Lock className="w-4 h-4 text-white/30" />
        )}
      </motion.div>

      <div className={cn(
        "absolute -bottom-6 text-[9px] uppercase tracking-widest font-black font-outfit select-none whitespace-nowrap",
        active ? "text-primary-400" : "text-white/20"
      )}>
        STATION 0{index + 1}
      </div>
    </div>
  );
};

/* ─── Milestone Card Component ─────────────────────────────────────────── */
const MilestoneCard = ({ 
  exp, 
  active, 
  index,
  onInspectBadge
}: { 
  exp: ExperienceItem; 
  active: boolean; 
  index: number; 
  onInspectBadge: (exp: ExperienceItem) => void;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      perspective={1200}
      scale={1.02}
      transitionSpeed={1500}
      className="w-full max-w-lg"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "group relative glass-adaptive p-6 rounded-[2rem] border transition-all duration-700 shadow-2xl flex flex-col justify-between overflow-hidden",
          active 
            ? "border-primary-500/40 dark:bg-black/40 bg-zinc-100/60 shadow-primary-500/10" 
            : "border-foreground/5 dark:bg-black/20 bg-zinc-100/20 opacity-60 filter grayscale saturate-50 hover:opacity-80"
        )}
      >
        {active && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-cyan-500/0 group-hover:from-primary-500/10 group-hover:to-cyan-500/10 rounded-[2rem] blur-xl transition-all duration-500 -z-10" />
        )}

        <div className={cn(
          "absolute top-0 bottom-0 w-[4px] transition-all duration-500",
          isLeft ? "left-0" : "right-0",
          active ? "bg-gradient-to-b from-primary-500 to-cyan-400" : "bg-foreground/10"
        )} />

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold">
            <Calendar size={14} className={active ? "animate-pulse" : ""} />
            <span className="text-[10px] uppercase tracking-widest">{exp.period}</span>
          </div>

          <div className={cn(
            "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 transition-all duration-500",
            active 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" 
              : "bg-foreground/5 border-foreground/10 text-foreground/30"
          )}>
            {active ? (
              <>
                <Unlock size={10} className="animate-bounce" />
                Unlocked
              </>
            ) : (
              <>
                <Lock size={10} />
                Locked
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h3 className={cn(
            "text-xl font-bold font-outfit transition-colors duration-300",
            active ? "text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400" : "text-foreground/50"
          )}>
            {exp.title}
          </h3>
          <div className={cn(
            "flex items-center gap-1.5 text-sm font-semibold italic mt-1",
            active ? "text-primary-600 dark:text-primary-400" : "text-foreground/40"
          )}>
            <Briefcase size={14} />
            {exp.company}
          </div>
          <p className={cn(
            "text-xs leading-relaxed mt-4",
            active ? "text-foreground/75" : "text-foreground/45"
          )}>
            {exp.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {exp.highlights.slice(0, 4).map((h) => (
            <span 
              key={h} 
              className={cn(
                "text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full border transition-all duration-300",
                active 
                  ? "bg-primary-500/5 border-primary-500/25 hover:border-primary-500/40 text-foreground/80" 
                  : "bg-foreground/5 border-foreground/5 text-foreground/40"
              )}
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-foreground/5 flex items-center justify-between">
          <div className="text-[10px] tracking-wider text-foreground/50">
            Reward: <span className={cn("font-bold font-outfit", active ? "text-cyan-600 dark:text-cyan-400" : "text-foreground/30")}>{exp.badge.xp}</span>
          </div>

          <motion.button
            whileHover={{ scale: active ? 1.05 : 1 }}
            whileTap={{ scale: active ? 0.95 : 1 }}
            disabled={!active}
            onClick={() => onInspectBadge(exp)}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300",
              active 
                ? "bg-primary-500 hover:bg-primary-600 text-white cursor-pointer shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40" 
                : "bg-foreground/5 text-foreground/20 border border-foreground/5 cursor-not-allowed"
            )}
          >
            <Sparkles size={11} className={active ? "animate-spin-slow" : ""} />
            Inspect Badge
          </motion.button>
        </div>
      </motion.div>
    </Tilt>
  );
};

/* ─── Milestone Row Layout Wrapper ─────────────────────────────────────── */
const MilestoneRow = ({ 
  exp, 
  index, 
  isActive, 
  onInspectBadge, 
  onUnlock 
}: { 
  exp: ExperienceItem; 
  index: number; 
  isActive: boolean; 
  onInspectBadge: (exp: ExperienceItem) => void; 
  onUnlock: (id: string) => void;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      onViewportEnter={() => onUnlock(exp.id)}
      viewport={{ amount: 0.35, once: true }}
      className="relative grid grid-cols-1 md:grid-cols-9 items-center md:gap-0 gap-8 py-12 md:py-16"
    >
      <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 z-30">
        <MilestoneNode active={isActive} index={index} exp={exp} />
      </div>

      <div className={cn(
        "col-span-1 md:col-span-4 flex items-center",
        isLeft ? "md:justify-end justify-start md:pr-16 pl-12 md:pl-0" : "hidden md:flex justify-end pr-16"
      )}>
        {isLeft ? (
          <MilestoneCard exp={exp} active={isActive} index={index} onInspectBadge={onInspectBadge} />
        ) : (
          index === 0 && (
            <div className="w-full pr-8">
              <MiniOrbit 
                centerIcon={<Award className="w-5 h-5 text-primary-400" />}
                centerText="MCA Core"
                items={["Java", "DBMS", "Web", "Cloud"]}
                color="from-primary-500 to-indigo-500"
                glowColor="rgba(139, 92, 246, 0.3)"
              />
            </div>
          )
        )}
      </div>

      <div className="hidden md:block col-span-1" />

      <div className={cn(
        "col-span-1 md:col-span-4 flex items-center",
        !isLeft ? "md:justify-start justify-start md:pl-16 pl-12" : "md:hidden flex justify-start pl-12"
      )}>
        {!isLeft ? (
          <MilestoneCard exp={exp} active={isActive} index={index} onInspectBadge={onInspectBadge} />
        ) : (
          index === 2 && (
            <div className="w-full pl-8 hidden md:block">
              <MiniOrbit 
                centerIcon={<Code className="w-5 h-5 text-cyan-400 animate-pulse" />}
                centerText="B.Sc CS"
                items={["DSA", "C++", "OS", "HTML"]}
                color="from-cyan-400 to-blue-500"
                glowColor="rgba(34, 211, 238, 0.3)"
              />
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};

/* ─── Achievements Toaster Notification List ─────────────────────────────── */
interface Toast {
  id: string;
  badgeName: string;
  rarity: string;
  xp: string;
  icon: string;
}

/* ─── Main Section Component ────────────────────────────────────────────── */
export const Experience = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<ExperienceItem | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const cometY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleUnlock = (id: string) => {
    if (unlockedIds.includes(id)) return;
    
    const exp = experiences.find(e => e.id === id);
    if (!exp) return;

    setUnlockedIds(prev => [...prev, id]);

    const toastId = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { 
      id: toastId, 
      badgeName: exp.badge.name, 
      rarity: exp.badge.rarity, 
      xp: exp.badge.xp, 
      icon: exp.badge.icon 
    }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 4500);
  };

  return (
    <section id="experience" className="py-24 relative scroll-mt-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow will-change-transform" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow will-change-transform" />

      <OrbitalGraphic flip={false} top="5%" />
      <FloatingRings flip={false} top="38%" />
      <ConstellationCluster flip={false} top="68%" />

      <OrbitalGraphic flip={true} top="22%" />
      <ConstellationCluster flip={true} top="48%" />
      <FloatingRings flip={true} top="72%" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium uppercase tracking-widest font-outfit"
          >
            My Odyssey & Badges
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold font-outfit mb-6"
          >
            Interactive <span className="text-gradient">Roadmap</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Scroll to unlock milestones, view professional and academic achievements, and claim your developer badges.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative py-12">
          {/* Base Unlit Connection Line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Glowing Scroll Activated Timeline Line */}
          <motion.div 
            className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500 via-cyan-500 to-pink-500 origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] z-10 will-change-transform"
            style={{ scaleY }}
          />

          {/* Traveling Glowing Comet Dot */}
          <motion.div 
            className="absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 blur-[2px] -translate-x-1/2 z-20 pointer-events-none"
            style={{ 
              top: cometY,
              boxShadow: "0 0 15px #00ffff, 0 0 30px #00ffff",
              willChange: "top, transform"
            }}
          />

          {/* Start Indicator */}
          <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 -top-6 z-20 flex flex-col items-center select-none">
            <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_10px_var(--color-primary-500)]" />
            <span className="text-[8px] uppercase tracking-widest font-black text-primary-400 mt-1.5">START</span>
          </div>

          {/* End Indicator */}
          <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 -bottom-6 z-20 flex flex-col items-center select-none">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff]" />
            <span className="text-[8px] uppercase tracking-widest font-black text-cyan-400 mt-1.5">GOAL</span>
          </div>

          {/* Experiences Iteration */}
          {experiences.map((exp, index) => {
            const isActive = unlockedIds.includes(exp.id);
            return (
              <MilestoneRow 
                key={exp.id}
                exp={exp}
                index={index}
                isActive={isActive}
                onInspectBadge={setSelectedMilestone}
                onUnlock={handleUnlock}
              />
            );
          })}
        </div>
      </div>

      {/* Achievement Detail Overlay Popup Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 dark:bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setSelectedMilestone(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.85)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <ParticleExplosion color="var(--color-primary-500)" />

              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-150/40 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-primary-500/50 hover:bg-zinc-200/50 dark:hover:bg-primary-500/10 text-zinc-550 dark:text-white/70 hover:text-zinc-800 dark:hover:text-white transition-all cursor-pointer z-50"
              >
                <X size={18} />
              </button>

              {/* Badge visual representation */}
              <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center relative py-6">
                <div className="absolute w-[200px] h-[200px] rounded-full bg-primary-500/10 dark:bg-primary-500/15 blur-[60px] -z-10 animate-pulse" />
                <div className="absolute inset-0 border border-dashed border-primary-500/10 rounded-full animate-spin-slow pointer-events-none" />

                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={800}
                  scale={1.05}
                  className="w-44 h-44 rounded-[2rem] bg-zinc-50/50 dark:bg-gradient-to-tr dark:from-black dark:via-zinc-950 dark:to-black border border-zinc-200 dark:border-primary-500/40 flex flex-col items-center justify-center p-6 shadow-xl dark:shadow-2xl relative group cursor-pointer"
                >
                  <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-zinc-300 dark:border-primary-500/45" />
                  <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-zinc-300 dark:border-primary-500/45" />
                  <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-zinc-300 dark:border-primary-500/45" />
                  <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-zinc-300 dark:border-primary-500/45" />

                  <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shadow-inner mb-4 relative overflow-hidden">
                    <BadgeIcon name={selectedMilestone.badge.icon} className="w-8 h-8 text-primary-500 dark:text-primary-400 group-hover:scale-110 transition-transform duration-500" />
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <h4 className="text-xs font-black font-outfit text-zinc-800 dark:text-white uppercase tracking-widest text-center mt-1 truncate max-w-full">
                    {selectedMilestone.badge.name}
                  </h4>
                  <div className="mt-1 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border bg-primary-500/10 border-primary-500/25 text-primary-600 dark:text-primary-400">
                    {selectedMilestone.badge.rarity}
                  </div>
                </Tilt>

                <div className="text-center mt-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-white/40">XP Gained</span>
                  <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-outfit mt-1">{selectedMilestone.badge.xp}</div>
                </div>
              </div>

              {/* Achievements information */}
              <div className="col-span-1 md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="text-[9px] uppercase tracking-widest font-black text-primary-600 dark:text-primary-400">{selectedMilestone.badge.title}</div>
                  <h2 className="text-3xl font-extrabold font-outfit text-zinc-900 dark:text-white mt-1 leading-tight">{selectedMilestone.title}</h2>
                  <div className="text-xs text-zinc-550 dark:text-white/50 font-medium italic mt-1 flex flex-wrap items-center gap-2">
                    <Briefcase size={12} className="text-primary-500 dark:text-primary-400" />
                    {selectedMilestone.company}
                    <span className="text-zinc-300 dark:text-white/20">•</span>
                    <Calendar size={12} className="text-primary-500 dark:text-primary-400" />
                    {selectedMilestone.period}
                  </div>
                  <p className="text-zinc-700 dark:text-white/70 text-xs md:text-sm leading-relaxed mt-4 border-l-2 border-primary-500/40 pl-4 py-2 bg-zinc-100/50 dark:bg-white/5 rounded-r-xl">
                    {selectedMilestone.description}
                  </p>
                </div>

                <div className="mt-6">
                  <h5 className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-white/50 mb-3 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-cyan-600 dark:text-cyan-400" />
                    Unlocked Skills & Proficiencies
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedMilestone.badge.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-zinc-800 dark:text-white/80 truncate max-w-[80%]">{skill.name}</span>
                          <span className="text-cyan-600 dark:text-cyan-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200/50 dark:bg-white/5 rounded-full overflow-hidden border border-zinc-200/30 dark:border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-200 dark:border-white/10 pt-4">
                  <h5 className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-white/50 mb-3">
                    Key Accomplishments
                  </h5>
                  <ul className="space-y-2">
                    {selectedMilestone.badge.achievements.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-start gap-2 text-xs text-zinc-700 dark:text-white/70"
                      >
                        <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">
                          <Check size={9} />
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Real-time Toast Notifications Stack */}
      <div className="fixed bottom-6 right-6 z-[250] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="pointer-events-auto w-full glass-adaptive p-4 rounded-2xl border border-primary-500/30 flex gap-4 items-center shadow-[0_10px_30px_rgba(var(--primary-rgb),0.2)]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg relative overflow-hidden shrink-0">
                <BadgeIcon name={toast.icon} className="w-5 h-5 text-white" />
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[8px] uppercase font-bold tracking-widest text-primary-400">Achievement Unlocked!</div>
                <h4 className="text-xs font-black text-foreground truncate">{toast.badgeName}</h4>
                <p className="text-[10px] text-foreground/60 flex items-center gap-1.5 mt-0.5">
                  <span className="font-extrabold text-cyan-400">{toast.rarity}</span>
                  <span>•</span>
                  <span className="font-bold">{toast.xp}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};