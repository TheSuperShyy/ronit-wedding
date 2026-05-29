import LogoBadge from '../ui/LogoBadge';
import { footer, contact } from '../../content/copy.he';

export default function Footer() {
  return (
    <footer className="bg-champagne py-12 text-center text-ink-soft">
      <LogoBadge className="mx-auto mb-3 h-12 opacity-90" />
      <p className="px-6 text-sm">{footer.brand} · {footer.tagline}</p>
      <a
        href={`tel:${contact.phone}`}
        className="mt-3 inline-block font-label text-xs tracking-wider text-gold-deep underline-offset-4 hover:underline"
      >
        📞 {contact.phoneLabel}
      </a>
    </footer>
  );
}
