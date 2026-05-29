import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { SOFT_EASE } from '../motion/variants';
import { buildChallahLeadPayload } from '../../lib/lead-payload';
import { leadForm } from '../../content/copy.he';

const fieldClass =
  'w-full rounded-xl border border-line bg-noir px-4 py-3 text-bone text-base ' +
  'placeholder:text-mute focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-shadow';
const labelClass = 'block text-bone font-semibold mb-1.5 text-[15px]';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string };

function Field({ id, label, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {rest.required && <span className="text-rose-500 ms-1" aria-hidden>*</span>}
      </label>
      <input id={id} name={id} className={fieldClass} {...rest} />
    </div>
  );
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const TOAST_TONE: Record<Exclude<Status, 'idle'>, string> = {
  submitting: 'bg-coal text-bone border border-line',
  success: 'bg-emerald-700/95 text-white',
  error: 'bg-rose-800/95 text-white',
};
const TOAST_DISMISS_MS = 5000;

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
    <section id="lead-form" className="relative bg-coal py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-9 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-black tracking-tight text-bone sm:text-5xl">{leadForm.title}</h2>
            <p className="mt-3 text-mute">{leadForm.subtitle}</p>
          </Reveal>
        </div>
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gold/25 bg-white/[0.03] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="fullName" label={f.fullName} autoComplete="name" required />
              <Field id="phone" label={f.phone} type="tel" inputMode="tel" autoComplete="tel" required />
              <Field id="eventType" label={f.eventType} />
              <Field id="eventDate" label={f.eventDate} type="date" />
              <Field id="city" label={f.city} autoComplete="address-level2" />
              <Field id="hearAbout" label={f.hearAbout} />
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-br from-gold-lite to-gold px-9 py-4 font-bold text-[#2a1d0e] shadow-cta transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? leadForm.submitting : leadForm.cta}
              </button>
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
    </section>
  );
}
