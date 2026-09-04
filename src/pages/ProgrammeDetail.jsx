import { useEffect, useRef, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { FaArrowRight, FaAngleRight } from "react-icons/fa";
import Reveal from "@/components/common/Reveal";
import WordsSlideUp from "@/components/common/WordsSlideUp";
import { programmeBySlug } from "@/data/programmePages";

/* Detail page for one CBI/RBI programme — /investment-migration/:slug.
 *
 * The LAYOUT here is henleyglobal.com's programme page, matched section by
 * section against their Antigua and Barbuda page at the client's instruction.
 * Four things carry that layout, and none of them are decoration:
 *
 *   1. A SPLIT HEADER. Copy on white in the left half, photograph bleeding off
 *      the right edge, and a pale tab band crossing the foot of the picture.
 *      Not the site's PageTitle banner — that is a centred title on a navy
 *      veil, which is a different page type.
 *   2. HALF-WIDTH GROUNDS. The overview band is slate on the left and pale on
 *      the right, each bleeding off its own edge of the viewport; "why choose
 *      us" is the same slate panel with nothing beside it.
 *   3. A LEFT-HAND MEASURE. Body sections occupy the left column and leave the
 *      right one empty, apart from one photograph that rides sticky beside
 *      Benefits and Requirements. The empty half is the point: it is what
 *      holds the measure near 70 characters.
 *   4. DASH BULLETS. A short rule in the margin, not a disc — the same mark
 *      .eyebrow uses.
 *
 * Rendered in the site's own tokens throughout: --c-primary slate, Garamond
 * 400 heads, hairlines, zero radius. Two deliberate departures from the
 * reference remain, both documented in programmePages.js — no factsheet
 * download (there is no factsheet), and no invented figures.
 *
 * ---- MEASURED GEOMETRY ------------------------------------------------------
 * Taken off the reference in a browser at a 1440 viewport, not estimated from a
 * screenshot. Everything below is one of its numbers:
 *
 *   content column   1200px, centred, so 120px gutters at 1440
 *                    -> max-w-[1248px] px-6. The 1248 is 1200 plus the two 24px
 *                       gutters px-6 adds, because border-box makes max-width
 *                       include them; it is NOT a width anyone chose. This is
 *                       narrower than the 1400 the rest of the site uses, which
 *                       is also true of the reference against its own header.
 *   column split     two 585px columns with a 30px gutter: 120–705 and 735–1320
 *                    -> w-[calc(50%-15px)] for the left, and the right-hand
 *                       photograph starts at calc(50% + 15px). Both are exact
 *                       at every width, because the container is centred and so
 *                       its midpoint IS 50%.
 *   half-width grounds  split at the VIEWPORT midpoint (720), not the column
 *                    gutter — the overview's slate/pale edge and the tab band
 *                    are a different split from the text columns.
 *   tab band         ends at 1153 = 80% of the viewport -> right-[20%]
 *   feature photo    380 wide inside the 585 column, flush to the container's
 *                    right edge, top-aligned with the Benefits heading, and at
 *                    its NATURAL aspect — the reference crops nothing here.
 *
 * The type scale is deliberately NOT the reference's. Theirs is 40/36/14px
 * against our 60/44/16, and adopting it would have made this the only page on
 * cgrone.com set at 14px. The measures above are wide enough for our larger
 * type: .t-body caps at 68ch ≈ 544px inside the 585px column.
 */

/* The reference's list bullet is a short horizontal rule set in the margin.
   It is .eyebrow's `.chev` at a lighter weight, and it is most of why those
   lists read as a document's rather than as a feature grid's. */
function RuleList({ items, tone = "dark", className = "" }) {
  const rule = tone === "light" ? "bg-white/60" : "bg-ink/40";
  const text = tone === "light" ? "!text-white/85" : "";

  return (
    <ul className={`space-y-6 ${className}`}>
      {items.map((item) => (
        <li key={item.slice(0, 40)} className="flex items-start gap-6 sm:gap-8">
          <span aria-hidden="true" className={`mt-[0.72em] h-px w-6 sm:w-8 shrink-0 ${rule}`} />
          <p className={`t-body m-0 ${text}`}>{item}</p>
        </li>
      ))}
    </ul>
  );
}

/* Flat uppercase trail with hairline dividers, not the site's
   `.page-breadcrumb` — that class is styled for white type on the navy banner
   and this header is white. */
function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-y-2 font-heading text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-3 sm:mx-4 h-3 w-px bg-hairline" />}
            {c.to ? (
              <Link to={c.to} className="transition-colors duration-300 hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* The strip that crosses the foot of the header photograph. Sentence case and
   hairline dividers, as the reference has it — not the uppercase tracked-out
   tabs this file carried before, which read as a toolbar.

   Every panel stays in the DOM and is hidden with `hidden` rather than being
   unmounted, so the prerenderer and search engines get all three. The tab
   strip is the one part of the reference that costs it indexable content, and
   there is no reason to copy that part of it. */
function Tabs({ tabs, active, onChange }) {
  const stripRef = useRef(null);

  /* Below lg the three labels come to ~500px against a 342px measure, so the
     strip scrolls. Keep the SELECTED tab in view: the default tab is the
     middle one, and without this it was clipped mid-word at the right edge on
     a phone — which reads as a broken layout rather than as something you can
     swipe. Only moves when the tab is actually out of view, so the desktop
     strip (which never overflows) is untouched. */
  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector('[aria-selected="true"]');
    if (!strip || !tab) return;
    const s = strip.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    if (t.right > s.right - 24) strip.scrollLeft += t.right - s.right + 24;
    else if (t.left < s.left + 24) strip.scrollLeft -= s.left - t.left + 24;
  }, [active]);

  return (
    <div
      ref={stripRef}
      role="tablist"
      aria-label="Page sections"
      /* -mx-6 px-6 lets the scroll area run to the viewport edge while the
         tabs keep the page's gutter: a label cut off at the edge of the screen
         reads as scrollable, one cut off inside a 24px margin reads as a
         mistake. Net zero at widths where nothing overflows. */
      className="flex items-center overflow-x-auto -mx-6 px-6"
    >
      {tabs.map((t, i) => {
        const on = t.id === active;
        return (
          <div key={t.id} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-5 lg:mx-8 h-5 w-px bg-hairline" />}
            <button
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => onChange(t.id)}
              className={`shrink-0 whitespace-nowrap py-7 lg:py-8 text-[15px] transition-colors duration-300 ${
                on ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span className={`inline-block border-b-2 pb-2 ${on ? "border-ink" : "border-transparent"}`}>
                {t.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const p = programmeBySlug[slug];
  const [tab, setTab] = useState("programme");

  /* Same posture as CountryDetail: an unknown slug goes home rather than
     rendering an empty shell, and matches App.jsx's catch-all. */
  if (!p) return <Navigate to="/investment-migration" replace />;

  const {
    name, Flag, kindLabel, lede, hero, intro, keyFacts, feature,
    benefits, requirements, procedure, whyChoose, faqs, related,
    disclosure, ctaImage, closing, tabs = [],
  } = p;

  /* The reference orders its strip country-background → programme → property,
     so the programme tab is INSERTED after the first supporting tab rather
     than pushed to the front. Clamped, so a programme that ships with fewer
     supporting tabs still produces a valid strip. */
  const allTabs = [...tabs];
  allTabs.splice(Math.min(1, tabs.length), 0, { id: "programme", label: kindLabel });

  const panel = (id) => (id === tab ? "" : "hidden");
  /* `procedure` is three paragraphs now and was one string before; accept both
     so an older entry cannot render as a blank section. */
  const procedureParas = Array.isArray(procedure) ? procedure : [procedure];

  return (
    /* .programme-page scopes the reference's type scale to this route — see the
       block after .t-small in index.css for the measured numbers and why they
       are not in the tokens. */
    <div className="programme-page">
      {/* ---- 0. split header ------------------------------------------------
          The section clears the fixed navbar itself; everything inside is
          positioned against the strip of page you can actually see. */}
      <section className="bg-white pt-[var(--nav-clear)]">
        <div className="relative">
          {/* Copy one side, photograph the other — and the photograph is never
              cropped, at any width.

              Five grid tracks build the page gutters, so the photograph can span
              the last two and run from the column gutter to the viewport edge
              WITHOUT a vw unit: 100vw includes the scrollbar on Windows and
              would land the bleed a dozen pixels out from every other section.
              At 1440 the tracks resolve to 120 | 585 | 30 | 585 | 120, which is
              the reference's grid exactly.

              The photograph is `w-full h-auto` in a `self-start` cell. That is
              the whole crop fix: no fixed height, no aspect box and no
              object-cover, so the image is shown at its own aspect ratio and
              there is nothing for the browser to cut off. It sizes the header
              row (705x529 at 1440 from the 1600x1200 source) and the copy sits
              beside it. Two earlier attempts here both cropped — a fixed
              bottom offset took 26% off the height, and filling the half took
              19% off the width. */}
          <div className="lg:grid lg:grid-cols-[minmax(24px,1fr)_minmax(0,585px)_30px_minmax(0,585px)_minmax(24px,1fr)]">
            <div className="px-6 lg:px-0 lg:col-start-2 lg:self-start pt-8 pb-12 lg:pt-12 lg:pb-14">
              <Crumbs
                items={[
                  { label: "Home", to: "/" },
                  { label: "Investment Migration", to: "/investment-migration" },
                  { label: name },
                ]}
              />

              {/* Not in the reference, which carries no flag. Kept because this
                  is a country programme and a 28px flag says which country
                  faster than the title does. */}
              {Flag && <Flag title={name} className="w-11 h-7 mt-8 object-cover ring-1 ring-ink/10" />}

              <WordsSlideUp as="h1" text={`${name} ${kindLabel}`} className="t-display text-ink mt-7" />

              <p className="t-body mt-9 max-w-[44ch]">{lede}</p>
            </div>

            {hero && (
              <div className="lg:col-start-4 lg:col-span-2 lg:self-start">
                <img src={hero.src} alt={hero.alt} className="block w-full h-auto" />
              </div>
            )}
          </div>

          {/* Tab band. Stops short of the right edge so the picture shows past
              its end: the reference's band ends at 1153 of 1440, which is 80%,
              so right-[20%] rather than the 21% that was here by estimate. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 right-0 lg:right-[20%] bg-offwhite"
            />
            <div className="relative max-w-[1248px] mx-auto px-6">
              <Tabs tabs={allTabs} active={tab} onChange={setTab} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- the two supporting tabs ----
          Left column, empty right — the reference's measure, and the same
          shape as Procedure below. */}
      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          className={panel(t.id)}
        >
          <section className="py-14 md:py-20 lg:py-24 bg-white">
            <div className="max-w-[1248px] mx-auto px-6">
              <Reveal className="lg:w-[calc(50%-15px)]">
                <h2 className="t-h2 text-ink">{t.heading}</h2>
                <div className="mt-8 space-y-6">
                  {t.body.map((b) => (
                    <p key={b.slice(0, 40)} className="t-body">
                      {b}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <Link to="/contact" className="btn-primary">
                    Book a Confidential Consultation <FaArrowRight />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      ))}

      {/* ---- programme tab ---- */}
      <div id="panel-programme" role="tabpanel" aria-labelledby="tab-programme" className={panel("programme")}>

        {/* ---- 1. overview: two half-width grounds -------------------------
            Each ground is a positioned sibling bleeding off its own edge of
            the viewport, with the copy in the ordinary container on top.
            Painted this way rather than as two 100vw panels with vw-derived
            gutters because 100vw INCLUDES the scrollbar on Windows — a vw
            gutter lands a dozen pixels out of line with every other section
            on the page. */}
        <section className="relative">
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 right-1/2 bg-primary" />
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-1/2 right-0 bg-offwhite" />

          <div className="relative max-w-[1248px] mx-auto px-6 grid lg:grid-cols-2">
            {/* below lg there are no halves to bleed into, so each column
                paints its own ground and -mx-6 px-6 takes it full width */}
            <Reveal className="bg-primary lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24 lg:pr-20">
              <h2 className="t-h2 !text-white">{kindLabel} Overview</h2>

              <div className="mt-8 space-y-5">
                {intro.map((t) => (
                  <p key={t.slice(0, 40)} className="t-body !text-white/85">
                    {t}
                  </p>
                ))}
              </div>

              {/* The reference pairs ENQUIRY with a FACTSHEET download. There
                  is no factsheet, and a dead download is worse than not having
                  one, so the second action is the link the FAQ already ends
                  on. */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-light">
                  Enquiry <FaArrowRight />
                </Link>
                {related?.short && (
                  <Link to={related.to} className="btn-outline-light">
                    {related.short} <FaAngleRight className="text-xs" />
                  </Link>
                )}
              </div>
            </Reveal>

            {/* the reference's two icon facts: line icon, Garamond head, one
                line of copy beneath it */}
            <Reveal
              delay={0.1}
              className="bg-offwhite lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24 lg:pl-20"
            >
              <dl className="m-0 space-y-12">
                {keyFacts.map((f) => (
                  <div key={f.label} className="flex items-start gap-7">
                    {f.icon && (
                      <f.icon aria-hidden="true" className="w-11 h-11 shrink-0 text-ink/70" strokeWidth={1} />
                    )}
                    <div>
                      <dt className="t-h3 text-ink">{f.label}</dt>
                      <dd className="t-body m-0 mt-4">
                        {f.value}
                        {f.note ? ` — ${f.note}` : ""}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---- 2 + 3. benefits and requirements, photograph riding sticky ---- */}
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          {/* gap-x-[30px], not gap-x-16: with the 1200px content column a 30px
              gutter makes each track 585 — the reference's column exactly. */}
          <div className="max-w-[1248px] mx-auto px-6 grid lg:grid-cols-2 gap-x-[30px] gap-y-14">
            <div>
              <Reveal>
                {/* kindLabel, not a hardcoded "Citizenship by Investment" —
                    the same component renders residence programmes, and the
                    heading has to follow `kind` rather than assume it. */}
                <h2 className="t-h2 text-ink">Benefits of {name} {kindLabel}</h2>
              </Reveal>
              <Reveal className="mt-9">
                <RuleList items={benefits} />
              </Reveal>

              {/* The reference numbers its qualifying routes. The numbering is
                  its convention, not a claim that the routes are ranked. */}
              <Reveal className="mt-16 lg:mt-20">
                <h2 className="t-h2 text-ink">Requirements of {name} {kindLabel}</h2>
                <p className="t-body mt-7">
                  To qualify, the main applicant must be over 18, meet the application requirements, and
                  select one of the following four options. Which one suits you depends on family size
                  and how long you want capital committed:
                </p>
              </Reveal>

              {/* Flat numbered sentences, which is what the reference has: a
                  number in the margin and one statement beside it. This carried
                  a heading, a tracked-out amount chip and a paragraph per route
                  — three typographic levels where the reference has none, and
                  about twice its word count. The figures now sit inside the
                  sentence, where the reference keeps them. */}
              <Reveal className="mt-9">
                <ol className="space-y-6">
                  {requirements.map((r, i) => (
                    <li key={r.slice(0, 40)} className="flex items-start gap-6 sm:gap-8">
                      <span aria-hidden="true" className="w-6 shrink-0 pt-0.5 text-[15px] text-ink tabular-nums">
                        {i + 1}.
                      </span>
                      <p className="t-body m-0">{r}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            {/* The reference's treatment, which this got wrong twice over: its
                photograph is 380 of the 585 column, flush to the container's
                right edge, top-aligned with the Benefits heading, and shown at
                its NATURAL aspect ratio.

                What was here filled the column at a forced aspect-[4/3] with
                object-cover, and rode sticky. The sticky was a reasonable
                argument — these two sections run long — but it is not what the
                reference does, and the forced aspect box is the thing to be rid
                of: an aspect box plus object-cover crops whatever does not fit,
                which is exactly the complaint. w-auto/h-auto here means the
                image is never cropped at any width, whatever aspect the next
                programme's photograph turns out to be. */}
            {feature && (
              <Reveal delay={0.1} className="lg:ml-auto lg:w-[65%]">
                <img src={feature.src} alt={feature.alt} className="w-full h-auto" />
              </Reveal>
            )}
          </div>
        </section>

        {/* ---- 4. procedure — left column, empty right ---- */}
        <section className="py-14 md:py-20 lg:py-24 bg-offwhite">
          <div className="max-w-[1248px] mx-auto px-6">
            <Reveal className="lg:w-[calc(50%-15px)]">
              <h2 className="t-h2 text-ink">Procedure for the {name} Programme</h2>
              <div className="mt-8 space-y-6">
                {procedureParas.map((t) => (
                  <p key={t.slice(0, 40)} className="t-body">
                    {t}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- 5. why choose us — the slate panel, bleeding off the LEFT ----
            Every line is checkable against the firm's own record: the
            reference's equivalent section leads with client and office counts
            this firm does not have, so those are absent rather than
            invented. */}
        <section className="relative bg-white">
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 right-1/2 bg-primary" />

          <div className="relative max-w-[1248px] mx-auto px-6">
            <Reveal className="lg:w-1/2 lg:pr-20 bg-primary lg:bg-transparent -mx-6 px-6 py-14 lg:mx-0 lg:px-0 lg:py-24">
              <h2 className="t-h2 !text-white">Why Choose Cynosure?</h2>
              <RuleList items={whyChoose} tone="light" className="mt-9" />
              <div className="mt-11">
                <Link to="/contact" className="btn-outline-light">
                  Enquiry <FaArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- 6. FAQ ---- */}
        <section className="py-14 md:py-20 lg:py-24 bg-white">
          <div className="max-w-[1248px] mx-auto px-6">
            <div className="lg:w-[calc(50%-15px)]">
              <Reveal>
                <h2 className="t-h2 text-ink">
                  {name} {kindLabel} Frequently Asked Questions
                </h2>
              </Reveal>

              {/* Native <details>, not a JS accordion: keyboard-operable and
                  expandable by the browser's own find-in-page without us
                  writing or maintaining any of that. */}
              <Reveal className="mt-10">
                <div className="border-t border-hairline">
                  {faqs.map((f) => (
                    <details key={f.q} className="group border-b border-hairline">
                      <summary className="flex items-start justify-between gap-8 py-7 cursor-pointer list-none">
                        <h3 className="t-h4 font-normal leading-[1.7] text-ink">{f.q}</h3>
                        {/* CSS-only marker; .faq-marker in index.css turns the
                            plus into an x when the row opens */}
                        <span
                          aria-hidden="true"
                          className="faq-marker relative shrink-0 mt-2.5 w-3.5 h-3.5 text-ink/70"
                        >
                          <span className="absolute left-0 top-1/2 w-full h-[1.5px] -translate-y-1/2 bg-current" />
                          <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                        </span>
                      </summary>
                      <p className="t-body pb-7">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Reveal>

              {/* the reference closes its FAQ with a link out to the regional
                  programmes, so this does too */}
              {related && (
                <Reveal className="mt-10">
                  <Link
                    to={related.to}
                    className="inline-flex items-center gap-1.5 text-ink font-heading font-semibold text-[12px] uppercase tracking-[0.16em] border-b-2 border-primary pb-1.5 hover:gap-3 transition-all duration-300"
                  >
                    {related.label} <FaAngleRight className="text-xs" />
                  </Link>
                </Reveal>
              )}

              {/* The slot the reference fills with "minimum investment". */}
              <Reveal className="mt-12">
                <p className="t-body border-l-2 border-primary pl-6">{disclosure}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- 7. contact ----
            Two columns when a photograph exists, matching the reference's
            contact block; the left-hand measure when it does not, rather than
            a paragraph running the full width of the page. */}
        <section className="py-14 md:py-20 lg:py-24 bg-offwhite border-t border-hairline">
          <div className="max-w-[1248px] mx-auto px-6">
            <div className={ctaImage ? "grid lg:grid-cols-2 gap-x-16 gap-y-10 items-center" : ""}>
              <Reveal className={ctaImage ? "" : "lg:w-[calc(50%-15px)]"}>
                <h2 className="t-h2 text-ink mb-5">{closing.title}</h2>
                <p className="t-body mb-9">{closing.text}</p>
                <Link to="/contact" className="btn-primary">
                  Book a Confidential Consultation <FaArrowRight />
                </Link>
              </Reveal>

              {ctaImage && (
                <Reveal delay={0.1}>
                  {/* natural aspect, like the other two photographs on this
                      page — an aspect box plus object-cover crops whatever
                      does not fit it */}
                  <img src={ctaImage.src} alt={ctaImage.alt} className="block w-full h-auto" />
                </Reveal>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
