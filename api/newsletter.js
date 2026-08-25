import { sendMail, EmailError } from "./_lib/email.js";
import {
  clientIp,
  escapeHtml,
  isEmail,
  looksLikeBot,
  methodGuard,
  rateLimit,
  readJsonBody,
  sanitizeLine,
} from "./_lib/http.js";

const TO = process.env.CONTACT_TO_EMAIL || "info@cgrone.com";

export default async function handler(req, res) {
  if (!methodGuard(req, res)) return;

  const body = await readJsonBody(req);
  if (!body) return res.status(400).json({ error: "Invalid request body." });

  if (looksLikeBot(body)) return res.status(200).json({ ok: true });

  if (!rateLimit(`newsletter:${clientIp(req)}`, { limit: 3 })) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
  }

  const email = sanitizeLine(body.email, 254);
  if (!isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const safe = escapeHtml(email);

  try {
    const id = await sendMail({
      to: TO,
      replyTo: email,
      subject: `Newsletter signup: ${email}`,
      html: `
      <div style="background:#FBF9F5;padding:24px">
        <div style="max-width:600px;margin:0 auto;background:#fff;padding:28px;border-top:4px solid #F97709">
          <h2 style="margin:0 0 4px;color:#11223D;font:600 20px/1.3 Georgia,serif">New newsletter signup</h2>
          <p style="margin:0 0 18px;color:#6B7385;font:14px/1.5 Arial,sans-serif">Submitted from the cgrone.com footer.</p>
          <p style="margin:0;font:16px/1.5 Arial,sans-serif">
            <a href="mailto:${safe}" style="color:#0A56A4">${safe}</a>
          </p>
        </div>
      </div>`,
    });
    console.log(`[newsletter] sent ${id} <- ${email}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[newsletter] send failed:", err.message, err instanceof EmailError ? err.detail : err);
    return res.status(502).json({ error: "Subscription failed. Please try again later." });
  }
}
