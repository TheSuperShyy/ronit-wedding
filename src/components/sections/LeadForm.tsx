import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { SOFT_EASE } from '../motion/variants';
import { buildChallahLeadPayload } from '../../lib/lead-payload';
import { leadForm } from '../../content/copy.he';

const fieldClass =
  'w-full rounded-xl border border-cream/40 bg-cream/95 px-4 py-3 text-base text-ink-body ' +
  'placeholder:text-ink-deep/40 focus:outline-none focus:ring-4 focus:ring-cream/40 transition-shadow';
const labelClass = 'block text-cream font-semibold mb-1.5 text-base';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string };

function Field({ id, label, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {rest.required && (
          <span className="text-rose-300 ms-1" aria-hidden>
            *
          </span>
        )}
      </label>
      <input id={id} name={id} className={fieldClass} {...rest} />
    </div>
  );
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const TOAST_TONE: Record<Exclude<Status, 'idle'>, string> = {
  submitting: 'bg-ink-deep text-cream',
  success: 'bg-emerald-700/95 text-cream',
  error: 'bg-rose-800/95 text-cream',
};
const TOAST_DISMISS_MS = 5000;

/** Lead capture — posts to the real /api/lead via buildChallahLeadPayload. §12. */
export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const reduced = useReducedMotion();
  const f = leadForm.fields;
  const dismissTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(dismissTimer.current), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const payload = buildChallahLeadPayload(new FormData(formEl), window.location.search);
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`submit failed (${res.status})`);
      setStatus('success');
      formEl.reset();
    } catch (err) {
      console.error('LeadForm submit failed', err);
      setStatus('error');
    }
    clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setStatus('idle'), TOAST_DISMISS_MS);
  }

  const isSubmitting = status === 'submitting';

  return (
    <Section bg="bg-accent" id="lead">
      <div className="mx-auto max-w-xl">
        <Reveal className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-extrabold text-cream sm:text-4xl">{leadForm.title}</h2>
          <p className="mt-3 text-cream/85">{leadForm.subtitle}</p>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="fullName" label={f.fullName} autoComplete="name" required />
              <Field id="phone" label={f.phone} type="tel" inputMode="tel" autoComplete="tel" required />
              <Field id="eventType" label={f.eventType} />
              <Field id="eventDate" label={f.eventDate} type="date" />
              <Field id="city" label={f.city} autoComplete="address-level2" />
              <Field id="hearAbout" label={f.hearAbout} />
            </div>
            <div className="pt-2 text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="relative isolate w-full rounded-full bg-button px-9 py-4 font-bold text-button-text shadow-cta transition-shadow ease-soft duration-200 hover:shadow-[0_14px_30px_rgba(135,87,62,0.4)] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {!reduced && !isSubmitting && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-button"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
                  />
                )}
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round" />
                    </svg>
                    {leadForm.submitting}
                  </span>
                ) : (
                  leadForm.cta
                )}
              </motion.button>
            </div>
          </form>
        </Reveal>

        <AnimatePresence>
          {status !== 'idle' && (
            <motion.div
              key={status}
              role="status"
              aria-live="polite"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: SOFT_EASE }}
              className={`fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md rounded-xl px-5 py-4 text-center shadow-cta ${TOAST_TONE[status]}`}
            >
              {status === 'submitting' ? leadForm.submitting : status === 'success' ? leadForm.success : leadForm.error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
