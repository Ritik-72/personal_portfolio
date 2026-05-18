import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface WarpStar {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('CONNECTING TO COSMOS PORTAL...');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle fake progress loading
  useEffect(() => {
    if (progress < 100) {
      const duration = progress < 30 ? 40 : progress < 75 ? 80 : 30; // vary speed slightly
      const timer = setTimeout(() => {
        const increment = Math.floor(Math.random() * 6) + 1;
        setProgress((prev) => Math.min(prev + increment, 100));
      }, duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 900); // short cinematic delay at 100%
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Update space log text based on progress
  useEffect(() => {
    if (progress < 25) {
      setLoadingText('CONNECTING TO COSMOS PORTAL...');
    } else if (progress < 45) {
      setLoadingText('SYNCHRONIZING ORBITAL TRAJECTORIES...');
    } else if (progress < 70) {
      setLoadingText('BOOTING QUANTUM PROPULSION DRIVES...');
    } else if (progress < 90) {
      setLoadingText('ENTERING THE AYUSMAN UNIVERSE...');
    } else {
      setLoadingText('WARP SPEED ENTRANCE READY!');
    }
  }, [progress]);

  // Add mouse move parallax listeners
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseOffset({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Infinite 3D Star Warp Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 3D Star projection setups
    const stars: WarpStar[] = [];
    const starCount = shouldReduceMotion ? 50 : 220;
    const maxZ = 1000;
    const fov = 200;

    const starColors = [
      '#ffffff',
      '#c7d2fe', // indigo-200
      '#a5f3fc', // cyan-200
      '#fbcfe8', // pink-200
    ];

    // Seed stars randomly
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * maxZ,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Animation Loop
    const draw = () => {
      if (!canvas || !ctx) return;

      // Deep space overlay with trail persistence (creates trailing lines for comets/warp)
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)'; // slight alpha trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars warp speed multiplier increases as progress grows
      const warpSpeed = shouldReduceMotion ? 0.8 : 3.0 + (progress / 100) * 12.0;

      stars.forEach((star) => {
        // Decreasing Z value drives the star closer
        star.z -= warpSpeed;

        // Reset if star passes camera plane
        if (star.z <= 0) {
          star.z = maxZ;
          star.x = (Math.random() - 0.5) * canvas.width * 2;
          star.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        // Project coordinates into 3D perspective
        const px = (star.x / star.z) * fov + canvas.width / 2;
        const py = (star.y / star.z) * fov + canvas.height / 2;

        // Calculate size based on distance
        const relativeSize = (1.0 - star.z / maxZ) * star.size * 2.2;

        // Draw star
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          // If warping fast, draw stars as speed lines
          if (progress > 50 && !shouldReduceMotion) {
            const lastZ = star.z + warpSpeed * 2.5; // length of trail
            const lastPx = (star.x / lastZ) * fov + canvas.width / 2;
            const lastPy = (star.y / lastZ) * fov + canvas.height / 2;

            ctx.beginPath();
            ctx.lineWidth = relativeSize * 0.7;
            ctx.strokeStyle = star.color;
            ctx.moveTo(px, py);
            ctx.lineTo(lastPx, lastPy);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.arc(px, py, Math.max(0.2, relativeSize), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Space Warp Drive Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

          {/* Deep Ambient Nebula Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,#020617_100%)] z-10 pointer-events-none" />

          {/* Nebula 1 (Distant Purple Dust) */}
          <motion.div
            className="absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#1e1b4b]/20 to-[#6d28d9]/5 blur-[120px] z-10 pointer-events-none"
            animate={shouldReduceMotion ? {} : {
              x: mouseOffset.x * 0.5,
              y: mouseOffset.y * 0.5,
            }}
          />

          {/* Nebula 2 (Distant Cyan Dust) */}
          <motion.div
            className="absolute -bottom-[20%] -right-[20%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-tr from-[#06b6d4]/5 to-[#1e1b4b]/20 blur-[140px] z-10 pointer-events-none"
            animate={shouldReduceMotion ? {} : {
              x: mouseOffset.x * -0.4,
              y: mouseOffset.y * -0.4,
            }}
          />

          {/* 🪐 PLANET 1: Large Hot gas giant (Foreground Right) */}
          <motion.div
            className="absolute -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 shadow-[0_0_80px_rgba(244,63,94,0.25)] z-10"
            style={{ willChange: 'transform' }}
            animate={shouldReduceMotion ? {} : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: 360,
            }}
            transition={shouldReduceMotion ? {} : {
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 160, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Planet Atmosphere Ring Effect */}
            <div className="absolute inset-0 rounded-full border border-white/10 scale-105 blur-[1px]" />
          </motion.div>

          {/* 🪐 PLANET 2: Medium Purple ice giant (Distant Top-Left with depth blur) */}
          <motion.div
            className="absolute -top-8 -left-8 sm:-top-16 sm:-left-16 w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-500 shadow-[0_0_60px_rgba(168,85,247,0.18)] z-10 blur-[1px]"
            style={{ willChange: 'transform' }}
            animate={shouldReduceMotion ? {} : {
              y: [0, 14, 0],
              x: [0, -12, 0],
              rotate: -360,
            }}
            transition={shouldReduceMotion ? {} : {
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 120, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="absolute inset-0 rounded-full border border-white/5 scale-110 blur-[2px]" />
          </motion.div>

          {/* 🪐 PLANET 3: Small cyan moon (Midground Right) */}
          <motion.div
            className="absolute top-[20%] right-[15%] w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-bl from-cyan-400 via-blue-600 to-indigo-900 shadow-[0_0_35px_rgba(6,182,212,0.15)] z-10"
            style={{ willChange: 'transform' }}
            animate={shouldReduceMotion ? {} : {
              y: [0, -12, 0],
              x: [0, -6, 0],
            }}
            transition={shouldReduceMotion ? {} : {
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 11, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* 🪐 PLANET 4: Blurred foreground moon (Floating Foreground Left) */}
          <motion.div
            className="absolute bottom-[20%] left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-700 shadow-[0_0_30px_rgba(236,72,153,0.2)] z-20 blur-[3px]"
            style={{ willChange: 'transform' }}
            animate={shouldReduceMotion ? {} : {
              y: [0, 16, 0],
              x: [0, 12, 0],
            }}
            transition={shouldReduceMotion ? {} : {
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Centered Futuristic HUD Controller */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Glassmorphic Cyber Center Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="glass-card border border-white/20 px-10 py-12 flex flex-col items-center shadow-[0_0_50px_rgba(139,92,246,0.15)] rounded-[2.5rem] max-w-sm w-full mx-6 text-center"
            >
              {/* Outer HUD Ring Rotating */}
              <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-white/5"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="48"
                    className="stroke-primary-500"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={301.6} // 2 * PI * r
                    strokeDashoffset={301.6 - (301.6 * progress) / 100}
                    transition={{ ease: "easeInOut" }}
                  />
                </svg>

                {/* Cyber HUD Accent Ring */}
                <div className="absolute inset-2 border border-dashed border-cyan-400/20 rounded-full animate-spin-slow" />

                {/* Percentage Loading Text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <motion.span className="text-3xl font-extrabold font-outfit text-white tracking-tighter">
                    {progress}%
                  </motion.span>
                  <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-widest">
                    Telemetry
                  </span>
                </div>
              </div>

              {/* Logo / Portfolio title */}
              <h2 className="text-3xl font-black font-outfit tracking-tight mb-2 text-white">
                <span className="text-primary-500">A</span>yusman.
              </h2>

              <p className="text-[9px] uppercase tracking-[0.4em] text-white/50 mb-6">
                Immersive Portfolio Engine
              </p>

              {/* Loading Status log */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-bold text-cyan-400 tracking-wider font-mono animate-pulse uppercase">
                    {loadingText}
                  </span>
                  <span className="text-[8px] text-white/45 font-mono">
                    SYS.READY
                  </span>
                </div>

                {/* Elegant loading bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  >
                    {/* Glowing lead particle */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] blur-[1px]" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Faint footer label inside loader */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[8px] uppercase tracking-[0.5em] text-white mt-8"
            >
              PREPARE FOR WARP ENTRANCE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
