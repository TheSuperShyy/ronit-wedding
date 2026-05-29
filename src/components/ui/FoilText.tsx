import type { ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

// Animated gold-foil gradient text. Wrap a heading span.
export default function FoilText({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(100deg,#f3dca0,#fff4d8 30%,#c8a45c 55%,#fff4d8 75%,#e7cf9a)',
        backgroundSize: '220% auto',
        animation: reduced ? undefined : 'foil-shimmer 5s linear infinite',
      }}
    >
      <style>{`@keyframes foil-shimmer { to { background-position: 220% center; } }`}</style>
      {children}
    </span>
  );
}
