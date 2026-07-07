// In-memory fixed-window limiter: 10 requests / 60s per IP.
//
// NOTE: in-memory state is per-instance and non-durable — it resets on restart
// and is not shared across multiple instances. For production use a shared store
// (e.g. Redis / Upstash). This is sufficient for a demo and shows the awareness.

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const hits = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  entry.count += 1;
  return { ok: entry.count <= MAX_REQUESTS };
}
