import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> & {
  children: ReactNode;
};

export default function Button({ children, className = '', ...rest }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      whileHover={reduced ? undefined : { y: -3 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full ' +
        'px-9 py-4 font-sans text-base font-bold text-[#2a1d0e] shadow-cta isolate ' +
        'bg-gradient-to-br from-gold-lite to-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/40 ' +
        className
      }
      {...(rest as any)}
    >
      {!reduced && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-3/5 w-2/5 -skew-x-12"
          style={{
            background: 'linear-gradient(120deg,transparent,rgba(255,255,255,.7),transparent)',
            animation: 'btn-sweep 4.5s 2s infinite',
          }}
        />
      )}
      <style>{`@keyframes btn-sweep { 0% { left: -60%; } 22%, 100% { left: 140%; } }`}</style>
      <span className="relative">{children}</span>
    </motion.a>
  );
}
