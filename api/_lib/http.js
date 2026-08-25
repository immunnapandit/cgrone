/* Shared request helpers for the form endpoints. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value) =>
  typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value.trim());

/* Submissions land in an HTML email, so every value that came from the form
   has to be escaped or a submitter could inject markup into the inbox. */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Header values are attacker-controlled; a newline in one would let a
   submitter add headers of their own to the outgoing message. */
export function sanitizeLine(value, max = 200) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

export async function readJsonBody(req) {
  // Vercel parses JSON bodies for us, but not when the content-type is absent.
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 64 * 1024) return null; // nothing legitimate is this big
    chunks.push(chunk);
  }
  if (!chunks.length) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

export function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

/* Best-effort throttle. Serverless instances do not share memory, so this
   caps a single burst from one IP rather than enforcing a global quota — it
   is here to blunt a script hammering one warm instance, not as the only
   defence. The honeypot below does the heavier lifting against bots; move
   this to Upstash/KV if the volume ever justifies it. */
const hits = new Map();

export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < windowMs)) hits.delete(k);
    }
  }

  return recent.length <= limit;
}

/* Bots fill in every field they find. A field hidden from humans that comes
   back populated is a bot, so we accept the request and quietly drop it —
   telling it that it failed only invites a retry with the field cleared. */
export const looksLikeBot = (body) => Boolean(body?.company);

export function methodGuard(req, res, method = "POST") {
  if (req.method === method) return true;
  res.setHeader("Allow", method);
  res.status(405).json({ error: "Method not allowed" });
  return false;
}
