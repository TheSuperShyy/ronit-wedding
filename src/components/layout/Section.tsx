import type { ReactNode } from 'react';
import Container from './Container';

type Props = {
  children: ReactNode;
  id?: string;
  bg?: string;
  className?: string;
  /** Render children edge-to-edge (no Container/padding). */
  full?: boolean;
};

export default function Section({ children, id, bg = 'bg-noir', className = '', full = false }: Props) {
  return (
    <section id={id} className={`relative ${bg} ${full ? '' : 'py-16 sm:py-20'} ${className}`}>
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}
