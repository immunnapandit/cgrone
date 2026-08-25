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

function buildHtml({ name, email, phone, subject, message }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6B7385;font:14px/1.5 Arial,sans-serif;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#11223D;font:14px/1.5 Arial,sans-serif">${value}</td>
    </tr>`;

  return `
  <div style="background:#FBF9F5;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;padding:28px;border-top:4px solid #F97709">
      <h2 style="margin:0 0 4px;color:#11223D;font:600 20px/1.3 Georgia,serif">New enquiry from cgrone.com</h2>
      <p style="margin:0 0 20px;color:#6B7385;font:14px/1.5 Arial,sans-serif">Submitted via the website contact form.</p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${row("Name", escapeHtml(name))}
        ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0A56A4">${escapeHtml(email)}</a>`)}
        ${phone ? row("Phone", escapeHtml(phone)) : ""}
        ${row("Subject", escapeHtml(subject))}
      </table>
      ${
        message
          ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #E7E2D8">
               <div style="color:#6B7385;font:14px/1.5 Arial,sans-serif;margin-bottom:6px">Message</div>
               <div style="color:#11223D;font:15px/1.6 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(message)}</div>
             </div>`
          : ""
      }
    </div>
  </div>`;
}

export default async function handler(req, res) {
  if (!methodGuard(req, res)) return;

  const body = await readJsonBody(req);
  if (!body) return res.status(400).json({ error: "Invalid request body." });

  // Accepted, then dropped — see looksLikeBot.
  if (looksLikeBot(body)) return res.status(200).json({ ok: true });

  if (!rateLimit(`contact:${clientIp(req)}`)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
  }

  const name = sanitizeLine(body.name, 120);
  const email = sanitizeLine(body.email, 254);
  const phone = sanitizeLine(body.phone, 40);
  const subject = sanitizeLine(body.subject, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !subject) {
    return res.status(400).json({ error: "Name and subject are required." });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const id = await sendMail({
      to: TO,
      replyTo: email,
      subject: `Website enquiry: ${subject}`,
      html: buildHtml({ name, email, phone, subject, message }),
    });
    console.log(`[contact] sent ${id} <- ${email}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    /* Resend's detail names the real cause (domain unverified, key revoked)
       and belongs in the server log — never in the response, which would hand
       a prober our mail configuration. */
    console.error("[contact] send failed:", err.message, err instanceof EmailError ? err.detail : err);
    return res
      .status(502)
      .json({ error: "We could not send your message. Please email info@cgrone.com directly." });
  }
}
