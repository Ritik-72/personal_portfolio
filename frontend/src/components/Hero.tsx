import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Tilt from 'react-parallax-tilt';
import { Github, Linkedin, Twitter, ArrowRight, Download, ChevronDown } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Hero = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // 3D Profile Image Hover Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  const scale = useSpring(1, springConfig);
  const translateZ = useSpring(0, springConfig);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Glass Reflection Glare Bg and Opacity
  const glareBg = useTransform([x, y], (latest) => {
    const latestX = latest[0] as number;
    const latestY = latest[1] as number;
    const posX = (latestX + 0.5) * 100;
    const posY = (latestY + 0.5) * 100;
    return `radial-gradient(circle at ${posX}% ${posY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`;
  });
  const glareOpacity = useSpring(useTransform(scale, [1, 1.22], [0, 1]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.22);
    translateZ.set(60);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
    translateZ.set(0);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 scroll-mt-24">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        {init && (
          <Particles
            id="tsparticles"
            options={{
              background: { opacity: 0 },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: { enable: true, mode: "repulse" },
                },
                modes: {
                  push: { quantity: 4 },
                  repulse: { distance: 100, duration: 0.4 },
                },
              },
              particles: {
                color: { value: "#8b5cf6" },
                links: {
                  color: "#8b5cf6",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: { enable: true },
                  value: 80,
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
        )}
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-adaptive text-primary-500 font-semibold text-sm mb-6 border border-primary-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Available for hire
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 leading-tight">
            Hi, I'm <span className="text-gradient">Ayusman</span>
            <br />
            <span className="text-3xl md:text-5xl">
              I am a{' '}
              <ReactTyped
                strings={[
                  'Python Developer',
                  'UI/UX Designer',
                  'AI Enthusiast',
                  'Creative Thinker',
                  'Gamer',
                  'Cricketer'
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
                className="text-primary-500"
              />
            </span>
          </h1>

          <p className="text-lg text-foreground/60 mb-10 max-w-xl leading-relaxed">
            Crafting digital experiences that merge cutting-edge technology with human-centric design. Specializing in high-performance web applications and AI-driven solutions.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <MagneticButton>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary group"
              >
                Get in touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <button className="btn-outline group">
                Resume
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: <Github size={20} />, href: "#" },
              { icon: <Linkedin size={20} />, href: "#" },
              { icon: <Twitter size={20} />, href: "#" }
            ].map((social, i) => (
              <MagneticButton key={i}>
                <motion.a
                  whileHover={{ scale: 1.1, color: "var(--color-primary-500)" }}
                  href={social.href}
                  className="p-3 rounded-xl glass-adaptive transition-colors block"
                >
                  {social.icon}
                </motion.a>
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        {/* 3D Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative perspective-1000 block w-full mt-16 lg:mt-0"
        >
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1500}
            className="w-full h-[450px] sm:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Main Image Card */}
            <div 
              className="absolute inset-0 glass-adaptive border-2 border-white/20 p-6 sm:p-8 flex flex-col justify-center items-center text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                className="relative mb-8" 
                style={{ transformStyle: 'preserve-3d' }}
                animate={isHovered ? { y: 0 } : { y: [0, -12, 0] }}
                transition={isHovered ? { duration: 0.3 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Breathing Ambient Glow behind image */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/30 to-cyan-500/30 blur-2xl pointer-events-none"
                  style={{ z: -10 }}
                  animate={{
                    scale: [0.92, 1.08, 0.92],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* AI Hologram Outer Ring (Clockwise) */}
                <motion.div
                  className="absolute -inset-6 pointer-events-none"
                  style={{ z: 15 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 text-primary-500">
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeDasharray="5 15 35 15 5 10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="url(#hologram-grad)"
                      strokeWidth="0.5"
                      strokeDasharray="60 15 120 20"
                    />
                    <defs>
                      <linearGradient id="hologram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* AI Hologram Inner Ring (Counter-Clockwise) */}
                <motion.div
                  className="absolute -inset-4 pointer-events-none"
                  style={{ z: 20 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-50 text-cyan-400">
                    <circle
                      cx="50"
                      cy="50"
                      r="43"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="4 8 12 8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="41"
                      fill="none"
                      stroke="url(#hologram-grad)"
                      strokeWidth="1.25"
                      strokeDasharray="150 40 30 10"
                    />
                  </svg>
                </motion.div>

                {/* Floating orbiting particles */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  const radius = 145; // slightly wider than the image container
                  const xVal = Math.cos((angle * Math.PI) / 180) * radius;
                  const yVal = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-cyan-400 pointer-events-none"
                      style={{
                        left: `calc(50% + ${xVal}px - 4px)`,
                        top: `calc(50% + ${yVal}px - 4px)`,
                        z: 30, // float in 3D space
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
                      }}
                      animate={{
                        x: [0, Math.random() * 25 - 12.5, 0],
                        y: [0, Math.random() * 25 - 12.5, 0],
                        scale: [0.5, 1.2, 0.5],
                        opacity: [0.1, 0.7, 0.1],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      }}
                    />
                  );
                })}

                {/* The profile image container itself */}
                <motion.div
                  className="w-64 h-64 rounded-full overflow-hidden ring-4 ring-primary-500/20 ring-offset-4 ring-offset-transparent cursor-pointer relative"
                  style={{
                    rotateX,
                    rotateY,
                    scale,
                    z: translateZ,
                    transformStyle: 'preserve-3d',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)' 
                      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover object-top scale-[1.2]"
                  />
                  {/* Dynamic Glass Glare Reflection */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: glareBg,
                      opacity: glareOpacity,
                      mixBlendMode: 'overlay',
                    }}
                  />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold font-outfit mb-2 group-hover:text-primary-500 transition-colors">Ayusman</h3>
              <p className="text-primary-500 font-medium mb-6">Building the Future</p>

              <div className="grid grid-cols-3 gap-4 w-full">
                <motion.div whileHover={{ y: -5 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary-500/10 transition-colors">
                  <p className="text-xl font-bold text-primary-500">1+</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-60">Years Exp.</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary-500/10 transition-colors">
                  <p className="text-xl font-bold text-primary-500">10+</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-60">Projects</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary-500/10 transition-colors">
                  <p className="text-xl font-bold text-primary-500">15K+</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-60">Happy Clients</p>
                </motion.div>
              </div>
            </div>

            {/* Animated Glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity -z-10" />
          </Tilt>

          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 cursor-pointer"
        onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[8px] uppercase tracking-[0.4em] opacity-40 text-foreground mb-1">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary-500 drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};
