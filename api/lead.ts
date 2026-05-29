// Vercel Edge Function — thin proxy from the site to the Ronit backend.
// The site posts to /api/lead; this forwards JSON to the backend, which
// handles dedup (incl. the Challah board), attribution, and Monday writes.
// TBD: confirm this is the correct backend for the Challah page.

export const config = { runtime: 'edge' };

const BACKEND_URL = 'https://api.ronitbarash.site/api/website/lead';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const upstream = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await upstream.text();
    const headers = new Headers(upstream.headers);
    headers.delete('content-encoding'); // body re-read as text; these may be stale
    headers.delete('content-length');
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return new Response(body, { status: upstream.status, headers });
  } catch {
    return new Response(JSON.stringify({ error: 'upstream_unreachable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
