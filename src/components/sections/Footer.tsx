import Container from '../layout/Container';
import { footer, contact } from '../../content/copy.he';

/** Closing footer: brand, tagline, office phone, copyright. No logo/pill. §11.17. */
export default function Footer() {
  return (
    <footer data-header-theme="dark" className="bg-ink-deep text-cream/85">
      <Container>
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-lg font-semibold text-cream">{footer.brand}</p>
          <p className="text-sm opacity-80">{footer.tagline}</p>
          <a
            href={`tel:${contact.phone.replace(/-/g, '')}`}
            className="mt-2 text-sm text-cream/90 transition-colors hover:text-cream"
          >
            {contact.phoneLabel}: <bdi>{contact.phone}</bdi>
          </a>
          <p className="pt-2 text-xs opacity-60">© {new Date().getFullYear()} {footer.brand}</p>
        </div>
      </Container>
    </footer>
  );
}
