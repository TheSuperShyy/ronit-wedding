import type { ReactNode } from 'react';
import Container from './Container';
import GoldDecor from '../ui/GoldDecor';

type Props = {
  children: ReactNode;
  id?: string;
  bg?: string;
  className?: string;
  /** Render children edge-to-edge (no Container/padding). */
  full?: boolean;
  /** Add the soft gold feminine backdrop behind the content. */
  decor?: boolean;
};

export default function Section({
  children,
  id,
  bg = 'bg-ivory',
  className = '',
  full = false,
  decor = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative ${decor ? 'overflow-hidden' : ''} ${bg} ${full ? '' : 'py-20 sm:py-24 lg:py-32'} ${className}`}
    >
      {decor && <GoldDecor />}
      {full ? children : <Container className="relative z-10">{children}</Container>}
    </section>
  );
}
