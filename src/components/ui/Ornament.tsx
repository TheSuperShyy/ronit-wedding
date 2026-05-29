// Start-aligned thin gold rule (RTL = aligned to the right edge of content).
export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`h-px w-16 bg-gradient-to-l from-gold to-transparent ${className}`} />
  );
}
