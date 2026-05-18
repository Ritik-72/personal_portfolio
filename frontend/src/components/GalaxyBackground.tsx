import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
  depth: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  dx: number;
  dy: number;
  active: boolean;
}

interface CosmicDust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

export const GalaxyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { backgroundTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Only render if the active background is 'stars'
  if (backgroundTheme !== 'stars') return null;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around center
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / 60;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) / 60;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || windowSize.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Set canvas dimensions
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    // Setup entities
    const stars: Star[] = [];
    const cosmicDust: CosmicDust[] = [];
    const shootingStars: ShootingStar[] = [];

    // Colors matching luxury dark space design
    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(165, 180, 252, ', // indigo-300
      'rgba(165, 243, 252, ', // cyan-200
      'rgba(244, 219, 255, ', // pinkish-purple
    ];

    const dustColors = [
      'rgba(139, 92, 246, ',  // primary purple
      'rgba(6, 182, 212, ',   // cyan
      'rgba(99, 102, 241, ',  // indigo
      'rgba(236, 72, 153, ',  // pink
    ];

    // Build standard stars
    const starCount = Math.floor((windowSize.width * windowSize.height) / 6000);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        size: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.8 + 0.2, // Parallax depth factor
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Build cosmic dust (faint floating ambient space gas clouds)
    const dustCount = Math.floor(windowSize.width / 150);
    for (let i = 0; i < dustCount; i++) {
      cosmicDust.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 80 + 40,
        color: dustColors[Math.floor(Math.random() * dustColors.length)],
        opacity: Math.random() * 0.03 + 0.01,
      });
    }

    // Prepare shooting comets queue
    for (let i = 0; i < 2; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        opacity: 0,
        dx: 0,
        dy: 0,
        active: false,
      });
    }

    const triggerShootingStar = (comet: ShootingStar) => {
      const startSide = Math.random() > 0.5 ? 'top' : 'right';
      comet.angle = Math.PI * 0.75 + (Math.random() - 0.5) * 0.2; // 135 degrees angle downwards left

      if (startSide === 'top') {
        comet.x = Math.random() * (windowSize.width * 0.8);
        comet.y = 0;
      } else {
        comet.x = windowSize.width;
        comet.y = Math.random() * (windowSize.height * 0.6);
      }

      comet.length = Math.random() * 80 + 50;
      comet.speed = Math.random() * 12 + 8;
      comet.opacity = Math.random() * 0.6 + 0.4;
      comet.dx = Math.cos(comet.angle) * comet.speed;
      comet.dy = Math.sin(comet.angle) * comet.speed;
      comet.active = true;
    };

    // Comet spawning loop
    let nextCometTime = Date.now() + Math.random() * 8000 + 4000;

    // Mouse interpolation state
    let mouseX = 0;
    let mouseY = 0;

    // Constellation lines index (select a subset of stars for lines to save CPU)
    const constellationStars = stars.filter((_, idx) => idx % 6 === 0 && stars[idx].depth > 0.5);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);

      // Lerp mouse coordinates for springy premium parallax
      if (!shouldReduceMotion) {
        mouseX += (mouseRef.current.targetX - mouseX) * 0.06;
        mouseY += (mouseRef.current.targetY - mouseY) * 0.06;
      }

      // Draw faint connection lines between close constellation stars
      if (!shouldReduceMotion && constellationStars.length > 0) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < constellationStars.length; i++) {
          const s1 = constellationStars[i];
          const s1X = s1.x + mouseX * s1.depth;
          const s1Y = s1.y + mouseY * s1.depth;

          for (let j = i + 1; j < constellationStars.length; j++) {
            const s2 = constellationStars[j];
            const s2X = s2.x + mouseX * s2.depth;
            const s2Y = s2.y + mouseY * s2.depth;

            // Calculate distance
            const dist = Math.hypot(s1X - s2X, s1Y - s2Y);
            if (dist < 100) {
              const alpha = (1 - dist / 100) * 0.15;
              ctx.strokeStyle = `rgba(165, 180, 252, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(s1X, s1Y);
              ctx.lineTo(s2X, s2Y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw and update stars
      stars.forEach((star) => {
        // Twinkle phase update
        star.phase += star.twinkleSpeed;
        const twinkleAlpha = star.baseOpacity * (0.3 + 0.7 * (Math.sin(star.phase) + 1) / 2);

        // Apply smooth mouse parallax relative to depth
        const drawX = (star.x + mouseX * star.depth + windowSize.width) % windowSize.width;
        const drawY = (star.y + mouseY * star.depth + windowSize.height) % windowSize.height;

        ctx.fillStyle = star.color + twinkleAlpha + ')';
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cosmic dust clouds (extremely soft and slow-moving blurred ambient shapes)
      cosmicDust.forEach((dust) => {
        if (!shouldReduceMotion) {
          dust.x += dust.vx;
          dust.y += dust.vy;

          // Wrap boundaries
          if (dust.x < -dust.radius) dust.x = windowSize.width + dust.radius;
          if (dust.x > windowSize.width + dust.radius) dust.x = -dust.radius;
          if (dust.y < -dust.radius) dust.y = windowSize.height + dust.radius;
          if (dust.y > windowSize.height + dust.radius) dust.y = -dust.radius;
        }

        const drawX = dust.x + mouseX * 0.3; // subtle dust parallax
        const drawY = dust.y + mouseY * 0.3;

        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, dust.radius);
        grad.addColorStop(0, dust.color + dust.opacity + ')');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, dust.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Handle random comet triggers
      if (Date.now() > nextCometTime) {
        const inactiveComet = shootingStars.find(c => !c.active);
        if (inactiveComet) {
          triggerShootingStar(inactiveComet);
        }
        nextCometTime = Date.now() + Math.random() * 12000 + 6000; // spawn next in 6-18 seconds
      }

      // Draw active comets
      shootingStars.forEach((comet) => {
        if (!comet.active) return;

        // Draw comet trail
        const trailEndX = comet.x - Math.cos(comet.angle) * comet.length;
        const trailEndY = comet.y - Math.sin(comet.angle) * comet.length;

        const cometGrad = ctx.createLinearGradient(comet.x, comet.y, trailEndX, trailEndY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        cometGrad.addColorStop(0.1, `rgba(6, 182, 212, ${comet.opacity * 0.8})`);
        cometGrad.addColorStop(0.5, `rgba(139, 92, 246, ${comet.opacity * 0.3})`);
        cometGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(trailEndX, trailEndY);
        ctx.stroke();

        // Draw small bright head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Update comet position
        comet.x += comet.dx;
        comet.y += comet.dy;

        // Terminate comet if offscreen
        if (
          comet.x < -100 ||
          comet.x > windowSize.width + 100 ||
          comet.y < -100 ||
          comet.y > windowSize.height + 100
        ) {
          comet.active = false;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, backgroundTheme, shouldReduceMotion]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] select-none">
      {/* Black luxury background */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Dynamic Nebula Gradient Clouds Layer (Hardware Accelerated CSS transforms) */}
      {!shouldReduceMotion && (
        <>
          {/* Nebula 1 (Deep Purple Cloud) */}
          <motion.div
            className="absolute top-[-25%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#1e1b4b]/40 to-[#6d28d9]/10 blur-[130px] opacity-60"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform' }}
          />

          {/* Nebula 2 (Futuristic Cyan/Blue Cloud) */}
          <motion.div
            className="absolute bottom-[-30%] right-[-15%] w-[85vw] h-[85vw] rounded-full bg-gradient-to-tr from-[#06b6d4]/10 to-[#1e1b4b]/30 blur-[150px] opacity-50"
            animate={{
              x: [0, -70, 0],
              y: [0, 50, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform' }}
          />

          {/* Nebula 3 (Pulsing Magenta core) */}
          <motion.div
            className="absolute top-[30%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-pink-500/5 to-purple-600/5 blur-[120px] opacity-40"
            animate={{
              scale: [0.92, 1.1, 0.92],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* The 60FPS Parallax Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Aurora Ambient Glow Wave Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/0 via-[#1e1b4b]/5 to-[#020617]/0 mix-blend-color-dodge opacity-60" />

      {/* Corner Vignette & Cinematic Ambient Shadows (Vercel / Apple vibe) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(2,6,23,0.85)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(30,27,75,0.25)]" />
    </div>
  );
};
