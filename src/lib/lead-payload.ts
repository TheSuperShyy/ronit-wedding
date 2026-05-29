// Pure transform: form values → the JSON the backend expects.
// Kept framework-free so it is unit-testable without a DOM.
export type ChallahLeadPayload = {
  name: string;
  phone: string;
  event_type?: string;
  event_date?: string;
  city?: string;
  referral_source?: string;
  service: 'challah';
  ig_id: string | null;
  utm_source: string;
};

const clean = (v: FormDataEntryValue | null): string => String(v ?? '').trim();
const opt = (v: FormDataEntryValue | null): string | undefined => {
  const s = clean(v);
  return s === '' ? undefined : s;
};

export function buildChallahLeadPayload(formData: FormData, search: string): ChallahLeadPayload {
  const params = new URLSearchParams(search);
  return {
    name: clean(formData.get('fullName')),
    phone: clean(formData.get('phone')),
    event_type: opt(formData.get('eventType')),
    event_date: opt(formData.get('eventDate')),
    city: opt(formData.get('city')),
    referral_source: opt(formData.get('hearAbout')),
    service: 'challah',
    ig_id: params.get('ig_id'),
    utm_source: params.get('utm_source') || 'direct',
  };
}
