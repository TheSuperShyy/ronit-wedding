import { describe, it, expect } from 'vitest';
import { buildChallahLeadPayload } from './lead-payload';

function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

describe('buildChallahLeadPayload', () => {
  it('maps form fields to backend snake_case keys', () => {
    const payload = buildChallahLeadPayload(
      fd({ fullName: ' שרה ', phone: '0501234567', eventType: 'כלה', eventDate: '2026-07-01', city: 'תל אביב', hearAbout: 'אינסטגרם' }),
      '',
    );
    expect(payload).toMatchObject({
      name: 'שרה',
      phone: '0501234567',
      event_type: 'כלה',
      event_date: '2026-07-01',
      city: 'תל אביב',
      referral_source: 'אינסטגרם',
      service: 'challah',
      utm_source: 'direct',
      ig_id: null,
    });
  });

  it('pulls ig_id and utm_source from the query string', () => {
    const payload = buildChallahLeadPayload(
      fd({ fullName: 'דנה', phone: '0500000000' }),
      '?ig_id=abc123&utm_source=instagram',
    );
    expect(payload.ig_id).toBe('abc123');
    expect(payload.utm_source).toBe('instagram');
  });

  it('omits empty optional fields as undefined', () => {
    const payload = buildChallahLeadPayload(fd({ fullName: 'א', phone: '05' }), '');
    expect(payload.city).toBeUndefined();
    expect(payload.event_type).toBeUndefined();
  });

  it('treats whitespace-only optional fields as undefined', () => {
    const payload = buildChallahLeadPayload(fd({ fullName: 'x', phone: 'y', city: '   ' }), '');
    expect(payload.city).toBeUndefined();
  });
});
