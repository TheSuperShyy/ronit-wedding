import type { ReactNode } from 'react';
import Container from './Container';
import BrandLogo from '../ui/BrandLogo';
import CallPill from '../ui/CallPill';

type Props = {
  children: ReactNode;
  bg?: string;
  className?: string;
  id?: string;
  padded?: boolean;
  /** Suppress the top BrandLogo (when this section merges with the one above). */
  noLogo?: boolean;
  /** Suppress the bottom CallPill (when this section merges with the one below). */
  noPill?: boolean;
};

// Backgrounds dark enough that the call-pill needs the ivory/glass treatment.
const DARK_BGS = new Set(['bg-ink-deep', 'bg-ink-night', 'bg-accent', 'bg-hero']);

/**
 * Page-block wrapper: applies the bg token, the vertical padding rhythm, and
 * auto-mounts a centered BrandLogo (top) + CallPill (bottom) so every section
 * reads like its own page. Re-Design.md §4 + §8. Sets no heading color.
 */
export default function Section({
  children,
  bg = 'bg-cream',
  className = '',
  id,
  padded = true,
  noLogo = false,
  noPill = false,
}: Props) {
  const theme = DARK_BGS.has(bg) ? 'dark' : 'light';
  return (
    <section
      id={id}
      data-header-theme={theme}
      className={`${bg} ${padded ? `${noLogo ? 'pt-0' : 'pt-4 sm:pt-6'} ${noPill ? 'pb-0' : 'pb-4 sm:pb-6'}` : ''} ${className}`}
    >
      {!noLogo && <BrandLogo />}
      <div className={padded ? `${noLogo ? 'pt-4 sm:pt-6' : '-mt-6 pt-0 sm:-mt-8'} ${noPill ? 'pb-4 sm:pb-6' : 'pb-8 sm:pb-12 lg:pb-16'}` : ''}>
        <Container>{children}</Container>
      </div>
      {!noPill && <CallPill theme={theme} />}
    </section>
  );
}
