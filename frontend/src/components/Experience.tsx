import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Code, Award } from 'lucide-react';
import { cn } from '../utils/cn';
import Tilt from 'react-parallax-tilt';

const experiences = [
  {
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
  },
  {
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
  },
  {
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
  },
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

/* ─── Decorative orbital graphic ─────────────────────────────────────────── */
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
      {/* Soft glow blobs */}
      <ellipse cx="100" cy="130" rx="55" ry="30" fill="rgba(139,92,246,0.13)" />
      <ellipse cx="115" cy="145" rx="38" ry="22" fill="rgba(6,182,212,0.10)" />
      <ellipse cx="90" cy="120" rx="28" ry="16" fill="rgba(236,72,153,0.08)" />

      {/* Orbit ring 1 — tilted ellipse */}
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

      {/* Orbit ring 2 — steeper tilt */}
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

      {/* Orbit ring 3 — small inner */}
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

      {/* Orbiting dot 1 — large dark sphere on ring 1 */}
      <circle r="10" fill="rgba(30,20,60,0.85)" style={{ animation: 'dot1 12s linear infinite', offsetPath: 'none' }}>
        <animateMotion dur="12s" repeatCount="indefinite">
          <mpath href="#path-orbit1" />
        </animateMotion>
      </circle>

      {/* Orbiting dot 2 — medium sphere on ring 2 */}
      <circle r="7" fill="rgba(20,15,50,0.80)">
        <animateMotion dur="18s" repeatCount="indefinite">
          <mpath href="#path-orbit2" />
        </animateMotion>
      </circle>

      {/* Orbiting dot 3 — small dark sphere on ring 3 */}
      <circle r="5" fill="rgba(25,18,55,0.75)">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#path-orbit3" />
        </animateMotion>
      </circle>

      {/* Tiny glint dot — stationary sparkle */}
      <circle cx="165" cy="88" r="2.5" fill="rgba(139,92,246,0.6)" />
      <circle cx="55" cy="170" r="1.8" fill="rgba(6,182,212,0.5)" />
      <circle cx="140" cy="175" r="1.5" fill="rgba(236,72,153,0.5)" />

      {/* Hidden paths for animateMotion */}
      <defs>
        <path id="path-orbit1" d="M 200,130 A 90,38 0 1,1 199.9,130" />
        <path id="path-orbit2" d="M 180,130 A 70,55 0 1,1 179.9,130" transform="translate(0,0)" />
        <path id="path-orbit3" d="M 155,130 A 45,18 0 1,1 154.9,130" />
      </defs>
    </svg>

    {/* CSS keyframes injected once — scoped inside the component */}
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

/* ─── Constellation cluster (small dot pattern) ──────────────────────────── */
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
      {/* Lines */}
      <line x1="30" y1="40" x2="90" y2="70" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8" />
      <line x1="90" y1="70" x2="150" y2="50" stroke="rgba(6,182,212,0.3)" strokeWidth="0.8" />
      <line x1="90" y1="70" x2="110" y2="130" stroke="rgba(139,92,246,0.25)" strokeWidth="0.8" />
      <line x1="110" y1="130" x2="60" y2="120" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" />
      <line x1="30" y1="40" x2="60" y2="120" stroke="rgba(139,92,246,0.15)" strokeWidth="0.6" />
      {/* Dots */}
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

/* ─── Floating ring decoration ───────────────────────────────────────────── */
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
      {/* cross-hair */}
      <line x1="70" y1="15" x2="70" y2="125" stroke="rgba(139,92,246,0.08)" strokeWidth="0.6" />
      <line x1="15" y1="70" x2="125" y2="70" stroke="rgba(6,182,212,0.08)" strokeWidth="0.6" />
      {/* accent dot */}
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

  // Distribute items across 2 rings
  const ring1Items = items.slice(0, 2);
  const ring2Items = items.slice(2);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center overflow-visible select-none my-6 md:my-0">
      {/* 3D Orbit CSS scoped to this orbit */}
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

      {/* Orbit area */}
      <div 
        className="relative w-[240px] h-[240px] flex items-center justify-center"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        {/* Core Center */}
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

        {/* Ambient background glow */}
        <div 
          className="absolute w-[120px] h-[120px] rounded-full blur-[50px] -z-10 opacity-30"
          style={{ backgroundColor: glowColor }}
        />

        {/* Ring 1 - diameter 130px */}
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

        {/* Ring 2 - diameter 210px */}
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

/* ─── Main Section ────────────────────────────────────────────────────────── */
export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative scroll-mt-24 overflow-hidden">
      {/* ── Original decorative background blobs ── */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      {/* ── NEW: Left-side orbital decorations ── */}
      <OrbitalGraphic flip={false} top="5%" />
      <FloatingRings flip={false} top="38%" />
      <ConstellationCluster flip={false} top="68%" />

      {/* ── NEW: Right-side orbital decorations (mirrored) ── */}
      <OrbitalGraphic flip={true} top="22%" />
      <ConstellationCluster flip={true} top="48%" />
      <FloatingRings flip={true} top="72%" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium"
          >
            My Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold font-outfit mb-6"
          >
            Professional <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A timeline of my professional growth, technical contributions, and academic foundation.
          </motion.p>
        </div>

        <div className="relative border-l-2 border-white/5 ml-4 md:ml-0 md:left-1/2">
          {/* Animated gradient for timeline line */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-0.5 bg-gradient-to-b from-primary-500/50 via-cyan-500/50 to-transparent" />
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:left-[-50%]' : 'md:pl-12'}`}
            >
              {/* Dot */}
              <div className={cn(
                "absolute top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-background z-10",
                index % 2 === 0 ? "md:right-[-9px] right-auto left-[-9px] md:left-auto" : "left-[-9px]"
              )} />

              {/* Interactive side orbits for 2nd and 3rd card on large screens */}
              {index === 1 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[-100%] w-full pr-16 text-right z-0 pointer-events-none">
                  <div className="inline-block pointer-events-auto">
                    <MiniOrbit 
                      centerIcon={<Award className="w-5 h-5 text-primary-400" />}
                      centerText="MCA Core"
                      items={["Java", "DBMS", "Web", "Cloud"]}
                      color="from-primary-500 to-indigo-500"
                      glowColor="rgba(139, 92, 246, 0.3)"
                    />
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[100%] w-full pl-16 text-left z-0 pointer-events-none">
                  <div className="inline-block pointer-events-auto">
                    <MiniOrbit 
                      centerIcon={<Code className="w-5 h-5 text-cyan-400 animate-pulse" />}
                      centerText="B.Sc CS"
                      items={["DSA", "C++", "OS", "HTML"]}
                      color="from-cyan-400 to-blue-500"
                      glowColor="rgba(34, 211, 238, 0.3)"
                    />
                  </div>
                </div>
              )}

              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                className="w-full"
              >
                <div className="group relative glass-adaptive p-8 rounded-[2.5rem] border border-white/10 hover:border-primary-500/50 transition-all duration-500 shadow-xl hover:shadow-primary-500/10">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 to-cyan-500/0 group-hover:from-primary-500/10 group-hover:to-cyan-500/10 rounded-[2.5rem] blur-xl transition-all duration-500 -z-10" />

                  <div className="flex items-center gap-3 mb-4 text-primary-400 font-medium justify-start md:justify-end"
                    style={index % 2 !== 0 ? { justifyContent: 'flex-start' } : {}}>
                    <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <Calendar size={14} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-80">{exp.period}</span>
                  </div>

                  <div className={cn(
                    "flex flex-col gap-1 mb-6",
                    index % 2 === 0 ? "md:items-end" : "md:items-start"
                  )}>
                    <h3 className="text-2xl font-bold font-outfit text-foreground group-hover:text-primary-500 transition-colors">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary-500 font-semibold italic">
                      <Briefcase size={16} />
                      {exp.company}
                    </div>
                  </div>

                  <p className={cn(
                    "text-foreground/60 text-sm mb-8 leading-relaxed",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    {exp.description}
                  </p>

                  <div className={cn(
                    "flex flex-wrap gap-2",
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  )}>
                    {exp.highlights.map((h) => (
                      <span key={h} className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};