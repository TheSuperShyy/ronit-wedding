// Radial candle-glow wash. position via inset utility classes from caller.
export default function GlowField({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        background:
          'radial-gradient(circle, rgba(200,164,92,0.20), rgba(200,164,92,0) 70%)',
      }}
    />
  );
}
