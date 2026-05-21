import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
