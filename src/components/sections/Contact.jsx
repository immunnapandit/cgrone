import { FaArrowRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import useFormSubmit from "@/hooks/useFormSubmit";
import { contactFields } from "@/data/contact";

/* ---- the panel photograph -------------------------------------------------
 * PROVENANCE — Unsplash, whose licence permits commercial use with no
 * attribution required. Recorded for the same reason banners.js records its
 * three: so the licence is traceable if anyone ever asks.
 *
 *   tower-blue-hour.webp   unsplash.com/photos/N3BgLmOcKrk  (Federico Garaffi)
 *   source 1600x2399 JPEG, 708KB -> webp q86, 457KB
 *
 * THE CONSTRAINT THIS PANEL IMPOSES, because three pictures failed it first:
 * it is a ~540x560 box with three WHITE credential rows set on it, so the
 * photograph has to be DARK where that type sits. Measured white-on-image
 * contrast, sampling the left 75% of the panel crop:
 *
 *   bg22.webp          couple with luggage at an airport — consumer travel
 *                      stock, and the last holiday story on a residency site
 *   skyline-mumbai     pale hazy sunrise; also a fourth variation on the one
 *                      idea the whole site already runs on
 *   office-dusk        unsplash zwe--GYIZtc, 1800x2700 — the near-square box
 *                      took 314px off its height, the building lost its top,
 *                      and what was left was flat PALE curtain wall
 *   this one           15.1:1 average. Blue-hour tower against a dark navy
 *                      sky, and the left third of the frame — where the copy
 *                      sits — is that sky.
 *
 * Rules for a replacement:
 *   1. Dark where the copy sits. Measure it, do not judge by eye.
 *   2. Composed to survive a near-square crop — this source is portrait, so
 *      object-cover takes the height, not the sides.
 *   3. No legible third-party marks. unsplash nBRHY7YZ3M0 was the
 *      best-looking candidate and was dropped for carrying "Parkopedia" and
 *      "Bulgaria 56" signage; unsplash ma9np8awQBc for a lit billboard.
 *      Another company's branding behind "Speak to Our Advisory Team" implies
 *      an association that does not exist.
 *   4. NOT from a general image search. Results there are overwhelmingly
 *      copyrighted, this is a commercial site for a firm whose positioning is
 *      professional standards, and an unlicensed photograph is the client's
 *      liability. Unsplash, Pexels and Wikimedia are the acceptable sources.
 */
import contactImage from "@/assets/images/contact/tower-blue-hour.webp";

/* The three credentials the left panel carries. The terms are the strings the
   panel has always shown; each now has a line under it, because a bare label
   floating on a picture was reading as a sticker rather than as a claim the
   firm is making. Nothing here is new copy — the details restate what the
   About section and the hero already say. */
const CREDENTIALS = [
  { term: "20+ Years Experience", detail: "International advisory across five jurisdictions." },
  {
    term: "Global Mobility Platform",
    detail: "Immigration, investment migration and workforce mobility in one place.",
  },
  { term: "Strategy-First Approach", detail: "The pathway is decided before any application is prepared." },
];

const BUTTON_LABEL = {
  idle: "Send Enquiry",
  sending: "Sending…",
  sent: "Enquiry Sent",
  error: "Try Again",
};

const LABEL = "font-heading text-[11px] uppercase tracking-[0.18em] text-muted mb-2";
const FIELD =
  "bg-transparent border-b border-hairline pb-2.5 text-ink outline-none focus:border-ink transition-colors font-body";

export default function Contact() {
  const { status, error, submit } = useFormSubmit("/api/contact");

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-24 bg-white border-t border-hairline scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* ---- section header ----
            This used to sit INSIDE the form column, which meant the section
            opened with a bordered box and no heading of its own — every other
            section on the site announces itself first and then presents its
            content. Lifting it out also lets the panel and the form read as
            two equal parts of one section rather than as decoration attached
            to a widget. */}
        <Reveal className="max-w-2xl">
          <div className="eyebrow mb-6">
            <span className="chev">»</span> Contact
          </div>
          <h2 className="t-h2 text-ink mb-5">Speak to Our Advisory Team</h2>
          <p className="t-lead">
            Tell us where you are trying to get to and we will set out what the
            route actually looks like. Prefer email?{" "}
            <a
              href="mailto:info@cgrone.com"
              className="text-ink font-medium border-b border-primary hover:text-primary transition-colors"
            >
              info@cgrone.com
            </a>
          </p>
        </Reveal>

        {/* 5/7, not 50/50. An even split left the form cramped enough that the
            two-up fields were tight, while the panel had more width than its
            three lines of copy needed.

            The outer border and the 60px drop shadow are gone with it. A
            bordered, shadowed rectangle reads as a widget dropped onto the
            page, and nothing else on this site is boxed like that — the rest
            of it is built out of hairlines and white space. */}
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 mt-12 lg:mt-16">
          {/* Hidden below lg: the picture carries no information the form does
              not, and on a phone it pushed the actual form a full screen down
              the page.

              bg-ink sits under the photograph so the panel is never a white
              gap while the image decodes. Nothing sits OVER the photograph —
              no scrim, no gradient, no opacity. The frame is dark enough on
              its own and `.on-photo` puts a shadow on the type rather than a
              layer on the picture, the same rule the hero follows. */}
          <Reveal
            direction="left"
            className="hidden lg:flex lg:col-span-5 flex-col justify-center relative min-h-[420px] bg-ink"
          >
            <img
              src={contactImage}
              alt="A glass office tower at blue hour"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <dl className="relative border-t border-white/25 mx-10 xl:mx-12 my-14 on-photo">
              {CREDENTIALS.map(({ term, detail }) => (
                <div key={term} className="border-b border-white/25 py-7">
                  <dt className="t-h4 text-white">{term}</dt>
                  <dd className="t-small text-white/80 mt-1.5">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-7">
            <form onSubmit={submit} className="space-y-8" noValidate={false}>
              {/* Ruled fields, not filled boxes.

                  The inputs were grey slabs using the label as the
                  placeholder. Two things were wrong with that. A placeholder
                  is not a label — it is not reliably exposed as the accessible
                  name and it disappears the moment someone types, so anyone
                  who loses their place has nothing to go back to (WCAG 3.3.2,
                  on the one form the firm collects enquiries through). And
                  five grey slabs is the look of a generic template form, on a
                  site built entirely out of hairlines.

                  So the labels are visible now — small, tracked out, above the
                  field — and the field itself is a single rule that darkens to
                  navy on focus. The sr-only labels this replaces are no longer
                  needed: these are real, visible ones. */}
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {contactFields.map((f) => (
                  <div key={f.name} className="flex flex-col">
                    <label htmlFor={`contact-${f.name}`} className={LABEL}>
                      {f.label}
                    </label>
                    <input
                      id={`contact-${f.name}`}
                      name={f.name}
                      type={f.type}
                      required={f.name !== "phone"}
                      autoComplete={f.autoComplete}
                      className={FIELD}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact-message" className={LABEL}>
                  Message
                </label>
                <textarea id="contact-message" name="message" rows={3} className={`${FIELD} resize-none`} />
              </div>

              {/* Honeypot: hidden from people, irresistible to bots. The API
                  accepts anything that fills it in and quietly drops it. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {/* Auto width, not full width. A full-bleed submit under ruled
                  fields reads as a phone app; the rule in index.css already
                  takes every button to 100% below 640px, which is where that
                  IS right.

                  No scale on hover/tap either — a button that grows under the
                  cursor reads consumer, not advisory. */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-70"
                >
                  {BUTTON_LABEL[status]} <FaArrowRight />
                </button>

                {/* aria-live so the outcome reaches a screen reader too — the
                    button label alone changes silently. */}
                <p aria-live="polite" className="text-sm font-body">
                  {status === "sent" && (
                    <span className="text-ink">
                      Thanks — we&apos;ve got your enquiry and will be in touch shortly.
                    </span>
                  )}
                  {status === "error" && <span className="text-error">{error}</span>}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
