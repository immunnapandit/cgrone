/* Transactional email via Resend.
 *
 * Kept behind a narrow sendMail() so the endpoints stay provider-agnostic —
 * this replaced a Microsoft Graph implementation without either handler
 * changing. Resend authenticates with a static API key and verifies sending
 * domains itself, so there is no tenant mailbox to own and no token to cache.
 */

const ENDPOINT = "https://api.resend.com/emails";

export class EmailError extends Error {
  constructor(message, detail) {
    super(message);
    this.name = "EmailError";
    this.detail = detail;
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new EmailError(`Missing environment variable: ${name}`);
  return value;
}

/**
 * @param {object}   opts
 * @param {string}   opts.to       recipient address
 * @param {string}   opts.subject
 * @param {string}   opts.html     body; callers must escape untrusted values
 * @param {string}  [opts.replyTo] so hitting Reply goes to the submitter
 * @returns {Promise<string|null>} Resend message id — worth logging, since it
 *   is the only handle on a message afterwards ("we sent it, here is the id"
 *   vs "it never left") when someone reports a missing enquiry.
 */
export async function sendMail({ to, subject, html, replyTo }) {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("MAIL_FROM");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    // Resend uses snake_case on the wire.
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: [replyTo] } : {}),
    }),
  });

  if (res.ok) {
    const sent = await res.json().catch(() => null);
    return sent?.id ?? null;
  }

  const detail = await res.json().catch(() => null);

  /* Resend's own message names the real cause — an unverified sending domain
     and a revoked key both surface as 4xx and are worth telling apart in the
     log. 429 is Resend's rate limit rather than ours, so it is called out. */
  throw new EmailError(
    res.status === 429
      ? "Resend rate limit reached"
      : `Resend request failed (${res.status})`,
    detail?.message || detail?.name || null
  );
}
